const express = require("express");
const router = express.Router();
const {
  createDNS,
  readDNS,
  updateDNS,
  deleteDNS,
} = require("../controllers/CRUD");

router.post("/dns", createDNS);
router.get("/dns/:zoneId", readDNS);
// router.put("/dns/:zoneId/:recordType/:name", updateDNS);
router.put("/dns/update", updateDNS);
router.delete("/dns/delete", deleteDNS);

module.exports = router;
