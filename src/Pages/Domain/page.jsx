import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Domain = () => {
  const [zoneId, setZoneId] = useState("");
  const [isValid, setIsValid] = useState(true);

  const nav = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[A-Z0-9]{21}$/.test(value)) {
      setIsValid(true);
      setZoneId(value);
    } else {
      setIsValid(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (isValid && zoneId.trim() !== "") {
      nav(`/dashboard/${zoneId}`);
    }
  };
  return (
    <div className=" h-screen ">
      <div className="flex flex-col justify-center items-center gap-y-5 py-56 w-fit mx-auto">
        <h1 className=" text-[50px]">Enter Hosted zone ID</h1>
        <input
          type="text"
          placeholder="Enter Hosted zone ID"
          className="border-2 border-slate-400 text-black rounded-md p-2 w-72 h-14"
          onChange={handleChange}
          required
        />
        {!isValid && (
          <p className="text-red-500">Please enter a valid ZoneId</p>
        )}

        <Button
          variant="contained"
          type="submit"
          className={` text-xl  rounded-md ${
            !isValid && "pointer-events-none opacity-50"
          }`}
          onClick={handleOnSubmit}
          disabled={!isValid}
        >
          <p className=" text-white">Submit</p>
        </Button>
      </div>
    </div>
  );
};

export default Domain;
