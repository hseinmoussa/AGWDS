const Schema = require("../Schema/Schema.js");

exports.Delete_Cards = async function (req, res) {
  try {
    if (red.body._id == undefined || req.body._id == "") {
      res.json({ status: 400, message: "Id doesn't exist" });
    } else {
      Schema.cards
        .deleteOne({ _id: `${req.body._id}` }, function (err) {
          if (err) console.log(err);
        })
        .then((data) => {
          res.json({ message: data });
        });
    }
  } catch (err) {
    console.log(err);
  }
};
