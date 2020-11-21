const Schema = require("../Schema/Schema.js");
var mongoose = require("mongoose");

var x = {
  y: (function () {
    if (true) return "somevalue";
  })(),
};

exports.Update_Contact = async function (req, res) {
  try {
    var Update_To = {};

    var social = {};
    if (req.body.FirstName && req.body.FirstName != "") {
      Update_To.FirstName = req.body.FirstName;
    }
    if (req.body.LastName && req.body.LastName != "") {
      Update_To.LastName = req.body.LastName;
    }
    if (req.body.DOB && req.body.DOB != "") {
      Update_To.DOB = req.body.DOB;
    }
    if (req.body.address && req.body.address != "") {
      Update_To.address = req.body.address;
    }
    if (req.body.tel && req.body.tel != "") {
      Update_To.tel = req.body.tel;
    }
    if (req.body.email && req.body.email != "") {
      Update_To.email = req.body.email;
    }
    if (req.body.facebook && req.body.facebook != "") {
      social.facebook = req.body.facebook;
    }
    if (req.body.twitter && req.body.twitter != "") {
      social.twitter = req.body.twitter;
    }
    if (req.body.github && req.body.github != "") {
      social.github = req.body.github;
    }
    if (req.body.gmail && req.body.gmail != "") {
      social.gmail = req.body.gmail;
    }
    if (req.body.linkedin && req.body.linkedin != "") {
      social.linkedin = req.body.linkedin;
    }

    console.log(social);
    //String to StringObject

    Schema.contact.update(
      { email: `${req.body.OldEmail}` },
      Update_To,
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(req.body.OldEmail);
        }
      }
    );

    Schema.social.update({}, social, { upsert: true }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
