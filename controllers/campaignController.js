const Campaign = require("../models/Campaign");
const nodemailer = require("nodemailer");
const nodeCron = require("node-cron");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


exports.createCampaign = async (req, res) => {
  const { title, message, recipients, scheduledTime } = req.body;

  if (!title || !message || !recipients || !scheduledTime) {
    return res.status(400).send("All fields are required");
  }

  try {
    const recipientList = recipients
      .split(",")
      .map(email => email.trim())
      .filter(email => email);

    const date = new Date(scheduledTime);
    if (isNaN(date.getTime()) || date < new Date()) {
      return res.status(400).send("Invalid or past scheduled time");
    }

    const campaign = new Campaign({
      title,
      message,
      recipients: recipientList,
      scheduledTime: date,
      status: "scheduled",
      logs: [],
    });

    await campaign.save();

   
    const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

    nodeCron.schedule(cronTime, async () => {
      const updatedCampaign = await Campaign.findById(campaign._id);
      if (!updatedCampaign) return;

      for (const email of updatedCampaign.recipients) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: updatedCampaign.title,
            html: updatedCampaign.message,
          });

          updatedCampaign.logs.push({
            email,
            status: "success",
            timestamp: new Date(),
          });
        } catch (err) {
          updatedCampaign.logs.push({
            email,
            status: "failed",
            timestamp: new Date(),
          });
        }
      }

      updatedCampaign.status = "sent";
      await updatedCampaign.save();
    });

    res.redirect("/campaigns");
  } catch (err) {
    console.error("Create campaign error:", err);
    res.status(500).send("Server Error");
  }
};
exports.listCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
    res.render("campaigns", { campaigns });
  } catch (err) {
    console.error("List campaigns error:", err);
    res.status(500).send("Server Error");
  }
};
