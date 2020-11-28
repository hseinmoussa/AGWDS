const Schema = require("../Schema/Schema.js");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
exports.Delete_Cards = async function (req, res) {
  try {
    if (req.body._id == undefined || req.body._id == "") {
      res.json({ status: 400, message: "Id doesn't exist" });
    } else {
      var image;
      Schema.cards
        .find({ _id: `${req.body._id}` }, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
          }
        })
        .then((data) => {
          image = data[0].Image;

          Schema.cards
            .deleteOne({ _id: `${req.body._id}` }, function (err, dat) {
              if (err) console.log(err);
            })
            .then(async (data) => {
              console.log("../../public/Image/" + image);
              await unlinkAsync("public/Image/" + image);
              res.json({ message: data });
            });
        });
    }
  } catch (err) {
    console.log(err);
  }
};
