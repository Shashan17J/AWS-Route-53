import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createRecord } from "../../services/operations/route53API";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
const AddRecord = () => {
  const nav = useNavigate();
  const { zoneId } = useParams();
  const [formData, setFormData] = useState({
    zoneId: zoneId,
    recordType: "",
    name: "",
    ipAddress: "",
    ttl: "",
  });

  const [record, setRecord] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await createRecord(formData);
      if (res.data) {
        setRecord(res);
        nav(`/dashboard/${zoneId}`);
      }
    } catch (error) {
      console.log("Error while Creating record");
    }
  };

  return (
    <div className=" h-screen">
      <div className=" pt-[9%] w-[50%] mx-auto">
        <h1 className=" text-black font-medium text-[40px] pb-10">
          {" "}
          Create Record
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            label="Zone ID"
            name="zoneId"
            value={zoneId}
            onChange={handleChange}
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel id="recordTypeLabel">Type</InputLabel>
            <Select
              labelId="recordTypeLabel"
              name="recordType"
              value={formData.recordType}
              onChange={handleChange}
              label="Record Type"
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="AAAA">AAAA</MenuItem>
              <MenuItem value="CNAME">CNAME</MenuItem>
              <MenuItem value="MX">MX</MenuItem>
              <MenuItem value="NS">NS</MenuItem>
              <MenuItem value="PTR">PTR</MenuItem>
              <MenuItem value="SOA">SOA</MenuItem>
              <MenuItem value="SRV">A</MenuItem>
              <MenuItem value="TXT">TXT</MenuItem>
              <MenuItem value="DNSSEC">DNSSEC</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Record Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            label="Value/Route traffic to"
            name="ipAddress"
            value={formData.ipAddress}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            label="TTL (seconds)"
            name="ttl"
            value={formData.ttl}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
