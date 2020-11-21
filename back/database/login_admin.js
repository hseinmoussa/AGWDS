const Schema = require("./Schema/Schema.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

exports.isPasswordAndUserMatch = (req, res, next) => {
  console.log(req.body.email);
  Schema.users.findOne({ email: req.body.email }, async (err, user) => {
    if (user == undefined) {
      return res.status(400).send("Cannot find user");
    }
    try {
      if (err) {
        console.log(err);
        res.status(404).send({ message: "Something Wrong!" });
      } else if (
        user &&
        (await bcrypt.compare(req.body.password, user.password))
      ) {
        const token = jwt.sign({ _id: user._id }, envs.TOKEN_SECRET);
        res.header("token", token);
        //console.log(envs.TOKEN_SECRET);
        //cookies
        res.cookie("token", token, { httpOnly: true });
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
