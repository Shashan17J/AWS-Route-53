import { useNavigate } from "react-router-dom";
import * as React from "react";
import { readRecord, updateRecord } from "../../services/operations/route53API";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useLoading } from "../../useContext/LoadingProvider";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UpdateDNS = ({}) => {
  const [records, setRecords] = useState([]);

  const { loading, setLoading } = useLoading();

  const nav = useNavigate();
  const { zoneId, name, recordType } = useParams();

  const handleUpdate = async (zoneId, name, recordType, ipAddress, ttl) => {
    try {
      const res = await updateRecord(zoneId, name, recordType, ipAddress, ttl);
      setRecords(res);
      nav(`/dashboard/${zoneId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await readRecord(zoneId);
        const recordsWithId = res.data.record
          .filter(
            (record) => record.name === name && record.recordType === recordType
          )
          .map((record, index) => ({
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
        marginTop: 20,
      }}
    >
      <p className="  text-[20px] w-10/12">
        Note:Through API, User Can Only Update Few Field Ex.TTL,ipAddress. If
        user change the other value Ex.name, recordType then aws route53 will
        create new record and not update the existing one. <br />
        The AWS Management Console may be using a different mechanism or API
        call internally to update the record, which could explain why it behaves
        differently. It's also possible that there are subtle differences in how
        the console interacts with Route 53 compared to your API implementation.
      </p>

      <h1 className=" text-[40px] font-semibold ">Update Record</h1>

      <div
        style={{ height: 400, width: "93%", marginTop: "30px" }}
        className=" bg-white"
      >
        <DataGrid
          rows={records}
          columns={[
            { field: "id", headerName: "ID", width: 70 },
            {
              field: "name",
              headerName: "Record name",
              width: 230,
            },
            {
              field: "recordType",
              headerName: "Type",
              width: 150,
            },
            {
              field: "ipAddress",
              headerName: "Value/Route traffic to",
              width: 300,
              editable: true,
            },
            {
              field: "ttl",
              headerName: "TTL(seconds)",
              width: 200,
              editable: true,
            },
            {
              field: "update",
              headerName: "",
              width: 120,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  onClick={() =>
                    handleUpdate(
                      zoneId,
                      name,
                      params.row.recordType,
                      params.row.ipAddress,
                      params.row.ttl
                    )
                  }
                  className=" bg-blue-500 rounded-lg w-20 "
                >
                  Update
                </Button>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          pageSize={5}
          checkboxSelection
          editOnClick
        ></DataGrid>
      </div>
    </div>
  );
};

export default UpdateDNS;
