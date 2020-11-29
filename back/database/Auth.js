const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
const auth = (req, res, next) => {

 //hsein
  //console.log(req.headers.token);
  //shadi
 // console.log(req.headers.cookie.slice(6,))
  //With token
  //const token = req.header("token");

  //With cookies
  // var token = req.cookies.token; before
  
  //hsein
  //var token = req.headers.token;

 // var token = req.cookies.token; before
  
  //final token
     //var token = req.headers.cookie.slice(6,);
  //final final token
  var token=req.cookies.token;
    
  if (!token)
    return res.status(401).send({
      status: 401,
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
