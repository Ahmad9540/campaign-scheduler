
const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    recipients: {
      type: [String],
      required: true
    },
    scheduleTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending"
    },
    logs: [
      {
        email: String,
        status: String,
        timestamp: Date
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
