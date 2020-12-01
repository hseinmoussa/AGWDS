const Schema = require("../Schema/Schema.js");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
exports.Edit_Card = async function (req, res) {
  try {
    if(req.fileValidationError) {
      return res.json({ status: 400, message:req.fileValidationError})
}
    var image;
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
      await Schema.cards
        .find({ _id: `${req.body._id}` }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
          }
        })
        .then(async (data) => {
          image = data[0].Image;
          if (fs.existsSync("public/Image/" + image)) 
          await unlinkAsync("public/Image/" + image);
        });

      await Schema.cards.update(
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
