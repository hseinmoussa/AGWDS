const Schema = require("../Schema/Schema.js");

exports.Edit_Card = async function (req, res) {
  try {
    if (
      req.body.Title == undefined ||
      req.body.Title == "" ||
      req.body.description == undefined ||
      req.body.description == "" ||
      req.body.categories == undefined ||
      req.body.categories == "" ||
      req.body.Views == undefined ||
      req.body.Views == "" ||
      req.file == undefined
    )
      res.json({ status: 400, message: "Please fill out all the fields" });
    else {
      var card = {
        Title: req.body.Title,
        description: req.body.description,
        categories: req.body.categories,
        Views: req.body.Views,
        Image: req.file.filename,
      };

      Schema.cards.update(
        { _id: `${req.body._id}` },
        card,
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: result });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
