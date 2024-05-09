const {
  ChangeResourceRecordSetsCommand,
  ListResourceRecordSetsCommand,
} = require("@aws-sdk/client-route-53");
const client = require("../config/aws");

exports.createDNS = async (req, res) => {
  try {
    const { zoneId, recordType, name, ipAddress, ttl } = req.body;

    if (!zoneId || !recordType || !name || !ipAddress || !ttl) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    const Domain = {
      HostedZoneId: zoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "CREATE",
            ResourceRecordSet: {
              Name: name,
              Type: recordType,
              TTL: ttl,
              ResourceRecords: [{ Value: ipAddress }],
            },
          },
        ],
      },
    };
    await client.send(new ChangeResourceRecordSetsCommand(Domain));
    return res.status(200).json({
      success: true,
      message: "DNS record created successfully",
    });
  } catch (error) {
    console.log("Error while creating domain", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create DNS record",
    });
  }
};

exports.readDNS = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const Domain = {
      HostedZoneId: zoneId,
    };

    const data = await client.send(new ListResourceRecordSetsCommand(Domain));
    const record = data.ResourceRecordSets.map((record) => ({
      name: record.Name,
      recordType: record.Type,
      ipAddress: record.ResourceRecords.map((r) => r.Value).join(","),
      ttl: record.TTL,
      // AWS Route 53 does not directly provide a routing policy attribute for individual DNS records
    }));

    return res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    console.log("Error while reading Domain", error);
    return res.status(500).json({
      success: false,
      message: "Failed to read DNS records",
    });
  }
};

exports.updateDNS = async (req, res) => {
  try {
    const { zoneId, recordType, name, ipAddress, ttl } = req.body;

    if (!zoneId || !recordType || !name || !ipAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    const Domain = {
      HostedZoneId: zoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "UPSERT",
            ResourceRecordSet: {
              Name: name,
              Type: recordType,
              TTL: ttl || 300,
              ResourceRecords: [{ Value: ipAddress }],
            },
          },
        ],
      },
    };

    await client.send(new ChangeResourceRecordSetsCommand(Domain));
    return res.status(200).json({
      success: true,
      message: "DNS record updated successfully",
    });
  } catch (error) {
    console.log("Error while updating DNS", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update DNS records",
    });
  }
};

exports.deleteDNS = async (req, res) => {
  try {
    const { zoneId, name, recordType, ipAddress, ttl } = req.body;

    if (!zoneId || !recordType || !name || !ttl || !ipAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required parameters" });
    }

    const Domain = {
      HostedZoneId: zoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: "DELETE",
            ResourceRecordSet: {
              Name: name,
              Type: recordType,
              TTL: ttl,
              ResourceRecords: [{ Value: ipAddress }],
            },
          },
        ],
      },
    };

    await client.send(new ChangeResourceRecordSetsCommand(Domain));
    return res.status(200).json({
      success: true,
      message: "DNS record deleted successfully",
    });
  } catch (error) {
    console.log("Error deleteing DNS record", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete DNS record",
    });
  }
};

// exports.deleteDNS = async (req, res) => {
//   try {
//     const { zoneId, name } = req.body;
//     if (!zoneId || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required parameters",
//       });
//     }

//     const Domain = {
//       HostedZoneId: zoneId,
//       ChangeBatch: {
//         Changes: [
//           {
//             Action: "DELETE",
//             ResourceRecordSet: {
//               Name: name,
//             },
//           },
//         ],
//       },
//     };
//     await client.send(new ChangeResourceRecordSetsCommand(Domain));
//     return res.status(200).json({
//       success: true,
//       message: "DNS record deleted successfully",
//     });
//   } catch (error) {
//     console.log("Error deleteing DNS record", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete DNS record",
//     });
//   }
// };

// ResourceRecordSet: {
//   Name: name,
//   Type: recordType,
//   TTL: ttl,
//   ResourceRecords: [{ Value: value }],
//   AliasTarget: {
//     DNSName: "your-dns-name",
//     EvaluateTargetHealth: false,
//     HostedZoneId: "your-hosted-zone-id",
//     RoutingPolicy: routingPolicy,
//   },
// },
