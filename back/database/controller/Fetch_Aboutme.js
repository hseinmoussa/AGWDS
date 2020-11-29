const Schema = require("../Schema/Schema.js");

exports.Fetch_Aboutme =  function (req, res) {
  try {
    Schema.about
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else console.log("ok");
      })
      .then((data) => {
        res.json({ message: data[0] });
      });
  } catch (err) {
    console.log(err);
  }
};