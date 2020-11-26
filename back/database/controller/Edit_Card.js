const Schema = require("../Schema/Schema.js");

exports.Edit_Card = async function (req, res) {
  var card = {
    Title: req.body.Title,
    description: req.body.description,
    categories: req.body.categories,
    Views: req.body.Views,
    Image: req.file.filename,
  };

  //String to StringObject

  Schema.cards.update({ _id: `${req.body._id}` }, card, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send({ message: result });
    }
  });
};
