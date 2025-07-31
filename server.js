const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");


dotenv.config();

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");


app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const campaignRoutes = require("./routes/campaignRoutes");
app.use("/", campaignRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
