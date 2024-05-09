import { apiConnector } from "../apiConnector";
import { route53Endpoints } from "../api";
import toast from "react-hot-toast";

const {
  CREATE_DNS_RECORD,
  READ_DNS_RECORD,
  UPDATE_DNS_RECORD,
  DELETE_DNS_RECORD,
} = route53Endpoints;

export const createRecord = async (data) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_DNS_RECORD, data);
    if (!response) {
      throw new Error("Could not Create record");
    }

    result = response;
    toast.success("Record Created Successfuly");
  } catch (error) {
    console.log("CREATE RECORD API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const readRecord = async (zoneId) => {
  let result = [];
  try {
    const response = await apiConnector("GET", `${READ_DNS_RECORD}/${zoneId}`);
    if (!response) {
      throw new Error("Could not Fetch record");
    }
    result = response;
  } catch (error) {
    console.log("FETCH RECORD API ERROR............", error.message);
    throw error;
  }
  return result;
};

export const updateRecord = async (
  zoneId,
  name,
  recordType,
  ipAddress,
  ttl
) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_DNS_RECORD, {
      zoneId,
      name,
      recordType,
      ipAddress,
      ttl,
    });
    if (!response) {
      throw new Error("Could not Update record");
    }
    result = response;
    toast.success("Record Update Successfully");
  } catch (error) {
    console.log("UPDATE RECORD API ERROR............", error);
    toast.error("Error While Updating Record");
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteRecord = async (
  zoneId,
  name,
  recordType,
  ipAddress,
  ttl
) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_DNS_RECORD, {
      zoneId,
      name,
      recordType,
      ipAddress,
      ttl,
    });
    if (!response) {
      throw new Error("Could not Delete record");
    }
    toast.success("Record Deleted Successfuly, Please Refresh ");
  } catch (error) {
    console.log("DELETE RECORD API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};
