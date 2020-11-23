const Schema = require("../Schema/Schema.js");

exports.Fetch_Cards = async function (req, res) {
  try {
    Schema.cards
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else console.log("a");
      })
      .then((data) => {
        res.json({ message: data });
      });
  } catch (err) {
    console.log(err);
  }
};
