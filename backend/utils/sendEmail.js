import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../helpers/emailTransport.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
  console.log(__filename);

  try {
    const sourceDir = fs.readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(sourceDir);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
