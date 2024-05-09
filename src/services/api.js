// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://lucidgrowthbackend.onrender.com/api/v1";

export const route53Endpoints = {
  CREATE_DNS_RECORD: BASE_URL + "/route53/dns",
  READ_DNS_RECORD: BASE_URL + "/route53/dns",
  UPDATE_DNS_RECORD: BASE_URL + "/route53/dns/update",
  DELETE_DNS_RECORD: BASE_URL + "/route53/dns/delete",
};

export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};
