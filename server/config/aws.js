const { Route53Client } = require("@aws-sdk/client-route-53");
require("dotenv").config();

const { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env;

const client = new Route53Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

module.exports = client;
