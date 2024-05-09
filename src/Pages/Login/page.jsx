import React, { useState } from "react";
import image from "../../../public/lucid_growth_logo.jpeg";
import { login } from "../../services/operations/authAPI";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
      await login(formData.email, formData.password, nav);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen">
      <div className=" w-[50%] mx-auto">
        <img src={image} alt="logo" width="10%" className=" mx-auto pt-10" />
        <h1 className="text-[30px] font-semibold  pb-10 w-20  mx-auto">
          Login
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
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <Typography color="error" fontWeight="bold">
            <Link href="/">SignUp</Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
