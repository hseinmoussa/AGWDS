const Schema = require("../Schema/Schema.js");
const test_function = require("./function/test_input_function");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const result = dotenv.config();
const { parsed: envs } = result;
if (result.error) {
  throw result.error;
}

exports.Change_Pass = async function (req, res) {
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

  if (req.body.newpass == undefined || req.body.newpass.length == 0) {
    return res.status(400).send({ error: "Invalid New Password" });
  }
  if (req.body.password == undefined || req.body.password == null) {
    return res.status(400).send({ error: "Wrong Password" });
  }

  try {
    const tested = await test_input(req.body.newpass);
    const hashedPassword = await bcrypt.hash(tested, 10);

    var newpass = {
      newpass: hashedPassword,
    };
  } catch (error) {
    return res.status(500).send({ error: "Could Not Hash" });
  }

  try {
    Schema.users.findOne({ email: req.body.email }, async function (err, user) {
      if (user == null || user == undefined) {
        res.status(400).send({ message: "il3ab ghayra ya 7aboob" });
      }

      if (await bcrypt.compare(test_input(req.body.password), user.password)) {
        if (err) return res.status(500).send({ error: err });

        const mailOptions = {
          from: "art@gallery.com",
          to: user.email,
          subject: "Sending Email using Node.js",
          text: "Password Changed",
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
        res.status(200).send({ message: "Password Changed" });
      } else {
        return res.status(400).send({ errors: ["Invalid Password"] });
      }
    });
  } catch (err) {
    return res.status(400).send({ error: "Something Went Wrong" });
  }
};
