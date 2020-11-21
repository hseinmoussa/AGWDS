const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Schema = require("../Schema/Schema.js");
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

exports.Forgot_Pass = async function (req, res) {
  Schema.users.findOne({ email: req.body.email }, async (err, user) => {
    if (user == undefined) {
      return res.status(400).send("Cannot find user");
    } else {
      const transporter = nodemailer.createTransport({
        host: "smtp.mailspons.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: envs.smtpuser,
          pass: envs.smtppass,
        },
      });

      jwt.sign(
        {
          email: req.body.email,
        },
        envs.EMAIL_SECRET,
        {
          expiresIn: "1h",
        },
        (err, emailToken) => {
          const url = `http://localhost:3001/checking/${emailToken}`;
          console.log(req.body.email);
          transporter.sendMail({
            to: req.body.email,
            subject: "Confirm Email",
            html: `Please click this link to change your password: <a href="${url}">${url}</a>`,
          });
          if (err) return res.status(500).send({ error: err });
        }
      );
      res.status(200).send({ message: "Check your Email" });
    }
  });
};
