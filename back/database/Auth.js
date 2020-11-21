const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
const auth = (req, res, next) => {
  //With token
  //const token = req.header("token");

  //With cookies
  var token = req.cookies.token;
  if (!token)
    return res.status(401).send({
      status: 200,
      message: "Access denied , you should be logged in",
    });
  try {
    const verified = jwt.verify(token, envs.TOKEN_SECRET);
    req.Admin = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = auth;
