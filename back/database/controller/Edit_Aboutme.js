const Schema = require("../Schema/Schema.js");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
exports.Edit_About = async function (req, res) {
  try {
//     if(req.fileValidationError) {
//       return res.json({ status: 400, message:req.fileValidationError})
// }
    var image;
    if (
      req.body.title == undefined ||
      req.body.title == "" ||
      req.body.about_description_title
      == undefined ||
      req.body.about_description_title
      == "" ||
      req.body.about_description== undefined ||
      req.body.about_description == "" 
      // req.file == undefined
    )
      res.json({ status: 400, message: "Please fill out all the fields" });
    else {
      var new_about = {
        title: req.body.title,
        about_description_title: req.body.about_description_title,
        about_description: req.body.about_description,
        // Image: req.file.filename,
      };
      await Schema.about
        .find({}, (err, docs) => {
          if (err) {
            console.log(err);
          } else {
          }
        })
        .then(async (data) => {
          // image = data[0].Image;
          // await unlinkAsync("public/Image/" + image);
        });

      await Schema.about.update(
        { },
        new_about,
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
