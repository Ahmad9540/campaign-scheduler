# Campaign Scheduler Web App

A Node.js + Express web application that allows users to create, schedule, and manage message campaigns (like announcements or reminders) with a clean UI and MongoDB as the backend database.

---

## Features

- ✅ Create and schedule campaigns
- ✅ Save recipient information
- ✅ View all campaigns in one place
- ✅ Logs to track sent messages (to be implemented)
- ✅ Backend powered by Express.js and MongoDB
- ✅ Clean and simple frontend UI using EJS

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Frontend**: HTML, CSS, EJS templating
- **Scheduling**: Node Cron (optional, if you add scheduled job features)

---

## Project Structure

project-root/
│
├── models/
│ └── Campaign.js # Mongoose schema for campaigns
│
├── routes/
│ └── campaignRoutes.js # API and web routes for campaign CRUD
│
├── views/
│ ├── campaigns.handlebars # Home page to list all campaigns
│ └── home.handlebars # Form to create a new campaign
│
├── public/ # Static files (CSS, JS)
│
├── server.js # Main Express server file
├── package.json
└── README.md


---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Ahmad9540/campaign-scheduler
cd campaign-scheduler

2. Install Dependencies

npm install

3. Set up MongoDB
Create a .env file and add your MongoDB URI:

MONGODB_URI=mongodb://localhost:27017/campaignsDB

4. Start the App

node server.js

Example Campaign Data:


Title: Submit Assignment
Message: All students must submit their assignments before 5 PM today.
Schedule: 20-07-2031 11:56
Status: Scheduled
Recipients: (Coming soon…)

Future Improvements:


 Add email/SMS integrations (e.g. Twilio, SendGrid)
 Add campaign edit/delete features
 Notification logs and history
 Authentication (Admin/User)

 Author:

Developed by Ashfaq Ahmad
GitHub: https://github.com/Ahmad9540


License:
This project is open-source and free to use under the MIT License.



