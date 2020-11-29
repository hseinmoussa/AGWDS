const Schema = require("../Schema/Schema.js");

exports.Fetch_Admins = async function (req, res) {
  try {
    Schema.users
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else console.log("ok");
      })
      .then((data) => {
        res.json({ message: data });
      });
  } catch (err) {
    console.log(err);
  }
};


