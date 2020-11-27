const Schema = require("../Schema/Schema.js");

exports.Fetch_Cards = async function (req, res) {
  try {
    Schema.cards
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

exports.Fetch_Cards_By_Views = async function (req, res) {
  try {
    Schema.cards
      .find({})
      .sort({ Views: "desc" })
      .exec(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else {
          console.log(data);
          res.json({ message: data });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
exports.Fetch_Cards_By_Views2 = async function (req, res) {
  try {
    Schema.cards
      .find({})
      .sort("Views")
      .exec(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else {
          console.log(data);
          res.json({ message: data });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
