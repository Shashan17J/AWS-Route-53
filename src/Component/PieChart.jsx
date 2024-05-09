import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readRecord } from "../services/operations/route53API";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useLoading } from "../useContext/LoadingProvider/";
Chart.register(...registerables);

const PieChart = () => {
  const [records, setRecords] = useState([]);
  const { loading, setLoading } = useLoading();

  const { zoneId } = useParams();

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await readRecord(zoneId);
        setRecords(response.data.record);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [zoneId]);

  const chartData = {
    labels: records.map((index) => index.name),
    datasets: [
      {
        label: "TTL (time to live)",
        data: records.map((index) => index.ttl),
        backgroundColor: generateRandomColors(records.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  };

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
    <div className="">
      <h1 className=" md:text-[40px] text-2xl font-bold my-8 w-fit mx-auto">
        Domain Record Distribution
      </h1>
      <div className="mx-auto aspect-square md:w-[50%]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
