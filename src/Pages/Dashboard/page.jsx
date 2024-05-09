import { useNavigate } from "react-router-dom";
import * as React from "react";
import { readRecord, deleteRecord } from "../../services/operations/route53API";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useLoading } from "../../useContext/LoadingProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ConfirmationModal from "../../Component/ConfirmationModal";

const Dashboard = ({}) => {
  const [records, setRecords] = useState([]);

  const { loading, setLoading } = useLoading();
  const [confirmationModal, setConfirmationModal] = useState(null);

  const nav = useNavigate();
  const { zoneId } = useParams();

  const handleDelete = async (zoneId, name, recordType, ipAddress, ttl) => {
    try {
      await deleteRecord(zoneId, name, recordType, ipAddress, ttl);
      setConfirmationModal(null);
    } catch (error) {
      console.log("Error deleting DNS record", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await readRecord(zoneId);
        const recordsWithId = res.data.record.map((record, index) => ({
          id: index + 1,
          ...record,
        }));
        setRecords(recordsWithId);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [zoneId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
        }}
      >
        <CircularProgress style={{ marginTop: "15rem" }} />
      </Box>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className=" text-[40px] font-semibold ">DNS RECORDS</h1>

      <div
        style={{ height: "full", width: "90%", marginTop: "40px" }}
        className=" bg-white"
      >
        <div
          style={{ width: "100%" }}
          className=" flex justify-end items-end pb-10 "
        >
          {/* Domain Record Distribution */}
          <div className=" md:space-x-11 md:space-y-0 space-y-5">
            <Button
              variant="contained"
              onClick={() => nav(`/analytics/${zoneId}`)}
            >
              Domain Record Distribution
            </Button>
            <Button variant="contained" onClick={() => nav(`/add/${zoneId}`)}>
              Create Record
            </Button>
          </div>
        </div>
        <DataGrid
          rows={records}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            { field: "name", headerName: "Record name", width: 230 },
            { field: "recordType", headerName: "Type", width: 80 },
            {
              field: "ipAddress",
              headerName: "Value/Route traffic to",
              width: 300,
            },
            { field: "ttl", headerName: "TTL(seconds)", width: 150 },
            {
              field: "update",
              headerName: "",
              width: 120,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  onClick={() =>
                    nav(
                      `/update/${zoneId}/${params.row.name}/${params.row.recordType}`
                    )
                  }
                  className=" bg-blue-500 rounded-lg w-20 "
                >
                  Update
                </Button>
              ),
            },
            {
              field: "delete",
              headerName: "",
              width: 120,

              renderCell: (params) => (
                <Button
                  variant="contained"
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this record?",
                      text2: "This record will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () =>
                        handleDelete(
                          zoneId,
                          params.row.name,
                          params.row.recordType,
                          params.row.ipAddress,
                          params.row.ttl
                        ),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                >
                  Delete
                </Button>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          pageSize={5}
          checkboxSelection
        ></DataGrid>
      </div>
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
