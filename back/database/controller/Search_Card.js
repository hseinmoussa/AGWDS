const Schema = require("../Schema/Schema.js");

exports.Search_Card = async function (req, res) {
  try {
    Schema.cards
      .find({ _id: req.body._id }, function (err, data) {
        if (err) console.log("Somthing went wrong!");
      })
      .then((data) => {
        res.json({ message: data });
      });
  } catch (err) {
    console.log(err);
  }
};
