
# Email Campaign Scheduler

A Node.js + Express web app to schedule email campaigns using SMTP, MongoDB, and Handlebars.


## Features

- Create & schedule email campaigns
- Prevent duplicate submissions
- Send emails using SMTP server (e.g., Gmail)
- Stores logs and campaign status in MongoDB
- Clean UI built with Handlebars


## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer (SMTP emails)
- Handlebars (template engine)
- dotenv


## Project Structure

├── app.js
├── .env.example
├── models/
│ └── Campaign.js
├── routes/
│ └── campaignRoutes.js
├── views/
│ ├── layouts/
│ ├── campaigns/
│ └── ...
├── public/
└── README.md


## .env Setup

Create a `.env` file based on the example below:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/email-campaigns
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password_or_app_password
If using Gmail, make sure to enable 2FA and use App Passwords

MongoDB Schema

const CampaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [String],
  scheduleTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  logs: {
    type: [String],
    default: []
  }
}, { timestamps: true });

Demo Video
Watch the working demo here:
Link1: https://drive.google.com/file/d/1kY438p_l5i4RecX5Ct2jYxw13hug_Asn/view?usp=sharing
Link2: https://drive.google.com/file/d/1DkBZI4lKzgPDsvSQW3edc9Wmuy3kr0DM/view?usp=sharing 

In this video you’ll see:

Campaign creation form
Validating and scheduling campaigns
Avoiding duplicate submissions
Viewing the list of sent/pending campaigns

Installation & Running Locally
Clone the repo
git clone https://github.com/Ahmad9540/campaign-scheduler

Install dependencies
npm install

Add your SMTP credentials in .env

Start the app
npm run dev
Visit http://localhost:3000

License:
MIT – Free to use and modify

Author:

Ashfaq Ahmad
LinkedIn: https://www.linkedin.com/in/ashfaq-ahmad-366345250/
GitHub: https://github.com/Ahmad9540



Let me know if you'd like to update any part (e.g., link to your real video or GitHub repo), and I’ll customize it for you!


