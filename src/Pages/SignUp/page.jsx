import React, { useState } from "react";

import image from "../../../public/lucid_growth_logo.jpeg";
import { signUp } from "../../services/operations/authAPI";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const nav = useNavigate();
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformData({ ...formData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "*Email is required!";
    }
    if (!values.password) {
      errors.password = "*Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "*Password must be more than 4 characters";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        nav
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" overflow-x-hidden">
      <div className=" w-[50%] mx-auto">
        <img src={image} alt="logo" width="10%" className=" mx-auto " />
        <h1 className="text-[30px] font-semibold pb-10 w-28 mx-auto">
          Sign Up
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
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
          <Typography color="error" fontWeight="bold">
            <Link href="/login">Login</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
