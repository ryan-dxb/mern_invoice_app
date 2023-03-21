import nodemailer from "nodemailer";
import "dotenv/config";

let transporter;

if (process.env.NODE_ENV === "development") {
  transporter = nodemailer.createTransport({
    host: "mailhog",
    port: 1025,
  });
  // } else {
  //   transporter = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST,
  //     port: process.env.SMTP_PORT,
  //     secure: false,
  //     auth: {
  //       user: process.env.SMTP_EMAIL,
  //       pass: process.env.SMTP_PASSWORD,
  //     },
  //   });
}

export default transporter;
