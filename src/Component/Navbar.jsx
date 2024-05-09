import React from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";
import { useState } from "react";
import ConfirmationModal from "../Component/ConfirmationModal";

const Navbar = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
  const nav = useNavigate();
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setConfirmationModal(null);
    toast.success("Logged Out");
    nav("/");
  };
  return (
    <>
      <div className="bg-slate-900 flex items-center justify-between">
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() => nav("/domain")}
        >
          <img src={logo} alt="logo" />
          <h1 className="text-white font-normal text-[30px] pt-2">
            DNS Manager
          </h1>
        </div>
        {token !== null && (
          <div className="w-fit">
            {/* <Button variant="contained" type="submit" onClick={handleSubmit}>
              Logout
            </Button> */}
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => {
                    handleSubmit();
                  },
                  btn2Handler: () => setConfirmationModal(null),
                });
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
