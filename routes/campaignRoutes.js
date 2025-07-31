const express = require("express");
const router = express.Router();
const moment = require("moment");
const Campaign = require("../models/Campaign");

router.get("/", (req, res) => {
  res.render("home");
});


router.post("/campaigns", async (req, res) => {
  const { title, message, recipients, scheduleTime } = req.body;

  const scheduledTime = moment(scheduleTime, "DD-MM-YYYY HH:mm").toDate();

  if (!scheduledTime || isNaN(scheduledTime)) {
    return res.status(400).send("Invalid date format. Use DD-MM-YYYY HH:mm");
  }

  try {
    const campaign = new Campaign({
      title,
      message,
      recipients: recipients.split(',').map(email => email.trim()),
      scheduleTime: scheduledTime
    });

    await campaign.save();
    res.redirect("/campaigns");
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).send("Server error");
  }
});


router.get("/campaigns", async (req, res) => {
  try {
    const rawCampaigns = await Campaign.find().sort({ createdAt: -1 });
    console.log("Raw campaigns from DB:", rawCampaigns);

    const seen = new Set();
    const campaigns = [];

    for (const c of rawCampaigns) {
      if (!c.title || !c.message || !c.recipients) continue;

      const key = `${c.title}-${c.message}-${(c.scheduleTime || '').toString()}-${c.recipients.join(",")}`;
      if (!seen.has(key)) {
        seen.add(key);
        campaigns.push({
          title: c.title,
          message: c.message,
          recipients: c.recipients.join(", "),
          scheduleTime: c.scheduleTime
            ? moment(c.scheduleTime).format("DD-MM-YYYY HH:mm")
            : "Not scheduled"
        });
      }
    }

    console.log("Filtered campaigns:", campaigns);
    res.render("campaigns", { campaigns });
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
