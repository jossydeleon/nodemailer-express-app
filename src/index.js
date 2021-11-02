require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const { generateHtml } = require("./util/helper");

//Create express app
const app = express();
//Parse incoming requests data
app.use(express.json());
//Cors enabled
app.use(cors());
//Morgan for dev
app.use(morgan("tiny"));

const port = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ENV_EMAIL_ACCOUNT,
    pass: process.env.ENV_EMAIL_PASSWORD,
  },
});

app.post("/mail-tracker", (req, res) => {
  const { email, product } = req.body;
  const mailData = {
    from: "Inventory Tracker <info@inventory.tracker>",
    to: `${email}`,
    subject: `Item out of stock`,
    html: generateHtml(product),
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return res.status(400).send({ message: "There was an error: " + error });
    }
    return res.status(200).send({ message: "Mail send successfully" });
  });
});

//Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
