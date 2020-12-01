const Schema = require("./Schema/Schema.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

exports.isPasswordAndUserMatch = (req, res, next) => {
  Schema.users.find({ email: req.body.email }, async (err, user) => {
    if (user[0] == undefined) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (err) {
        console.log(err);
        res.status(404).send({ message: "Something Wrong!" });
      } else if (
        user &&
        (await bcrypt.compare(req.body.password, user[0].password))
      ) {
      
        const token = jwt.sign({ _id: user[0]._id }, envs.TOKEN_SECRET, {
          expiresIn: "2h",
        },);
        //console.log(envs.TOKEN_SECRET);
        //cookies
       // res.cookie("token", token, { httpOnly: true });
        res.json({ token });

        //res.cookie("jwt", token, { secure: true, httpOnly: true });
      } else {
        return res.status(400).send({ errors: ["Invalid email or password"] });
      }
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });
};
