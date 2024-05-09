import toast from "react-hot-toast";
import { authEndpoints } from "../api";
import { apiConnector } from "../apiConnector";

const { SIGNUP_API, LOGIN_API } = authEndpoints;

export const signUp = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  nav
) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      nav,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Signup Successful");
    nav("/login");
  } catch (error) {
    console.log("SIGNUP API ERROR............", error.message);
    toast.error("Signup Failed");
  }
  toast.dismiss(toastId);
};

export const login = async (email, password, nav) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
      nav,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    toast.success("Login Successful");
    nav("/domain");
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    toast.error("Login Failed");
  }
  toast.dismiss(toastId);
};
