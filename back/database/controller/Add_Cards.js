const Schema = require("../Schema/Schema.js");
const test_function = require("./function/test_input_function");

exports.Add_Cards = async function (req, res) {
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
      var newCard = {
        Title: req.body.Title,
        description: req.body.description,
        categories: req.body.categories,
        Views: req.body.Views,
        Image: req.file.filename,
      };
      //const admin = new Admin(newAdmin);
      const card = new Schema.cards(newCard);
      await card
        .save()
        .then((user) => {
          console.log(user);
        })
        .catch((err) => console.log(err));

      Schema.cards
        .find(function (err, data) {
          if (err) console.log("Somthing went wrong!");
        })
        .then((cards) => {
          res.json({ status: 200, message: cards });
        });
    }
  } catch (err) {
    console.log(err, "this");
  }
};
