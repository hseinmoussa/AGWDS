const Schema = require("../Schema/Schema.js");
const atob = require('atob');
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};


    
exports.Fetch_Contact = async function (req, res) {
  try{
    console.log(parseJwt(req.cookies.token))
    const userID = parseJwt(req.cookies.token)._id
  Schema.users
  .findOne({_id:userID},function (err, data) {
    if (err) console.log("Somthing went wrong!");
  })
  .then((data) => {
    res.json({ message: data });
  });
}  catch (err) {
    console.log(err);
  }
};
