const Schema = require("../Schema/Schema.js");

exports.Fetch_Contact = async function (req, res) {
  try {
    Schema.contact
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else console.log(data);
      })
      .then((data) => {
        res.json({ message: data[0] });
      });
  } catch (err) {
    console.log(err);
  }
};
