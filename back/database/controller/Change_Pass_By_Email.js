const Schema = require("../Schema/Schema.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const test_function = require("./function/test_input_function");
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const { parsed: envs } = result;

function test_input(data) {
  data = data.trim();
  data = test_function.stripslashes(data);
  data = test_function.htmlspecialchars(data);
  return data;
}

const transporter = nodemailer.createTransport({
  host: "smtp.mailspons.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: envs.smtpuser,
    pass: envs.smtppass,
  },
});

exports.checking = async (req, res, next) => {
  var token = req.params.id;
  if (!token)
    return res.status(401).send({
      status: 200,
      message: "Access denied , you should be logged in",
    });
  try {
    var randomstring = Math.random().toString(36).slice(-8); // generating random password
    const verified = jwt.verify(token, envs.EMAIL_SECRET);
    // console.log(verified)
    // console.log(randomstring)

    try {
      const tested = await test_input(randomstring);
      console.log(tested);
      const hashedPassword = await bcrypt.hash(tested, 10);
      var newpass = {
        newpass: hashedPassword,
      };
    } catch (error) {
      return res.status(500).send({ message: "Could Not Hash", error });
    }

    try {
      Schema.users.findOne({ email: verified.email }, async function (
        err,
        user
      ) {
        if (user == null || user == undefined) {
          res.status(400).send({ message: "il3ab ghayra ya 7aboob" });
        }

        const mailOptions = {
          from: "art@gallery.com",
          to: user.email,
          subject: "Sending Email using Node.js",
          text: `Password Has been Reset use 
                  ${randomstring} to sign in and change your password as soon as possible`,
        };

        user.password = newpass.newpass;
        user.save(function (err) {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          if (err) return res.status(500).send({ error: err });
        });
        res.status(200).send({ message: "Password Has been Reset" });
      });
    } catch (err) {
      return res.status(400).send({ error: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};
