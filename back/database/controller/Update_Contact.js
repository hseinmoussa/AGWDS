const Schema = require("../Schema/Schema.js");
var mongoose = require("mongoose");



exports.Update_Contact = async function (req, res) {
  try {
    var Update_To = {};

    var social = {};
    if (req.body.FirstName && req.body.FirstName != "") {
      Update_To.FirstName = req.body.FirstName;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.LastName && req.body.LastName != "") {
      Update_To.LastName = req.body.LastName;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }

    if (req.body.email && req.body.email != "") {
      Update_To.email = req.body.email;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.facebook && req.body.facebook != "") {
      social.facebook = req.body.facebook;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.twitter && req.body.twitter != "") {
      social.twitter = req.body.twitter;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.github && req.body.github != "") {
      social.github = req.body.github;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.gmail && req.body.gmail != "") {
      social.gmail = req.body.gmail;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    if (req.body.linkedin && req.body.linkedin != "") {
      social.linkedin = req.body.linkedin;
    }
    else{ res.json({ status: 400, message: "Please fill out all the fields" }); }
    Schema.users.findOne({
   
      email: req.body.email
 
}).then(async user => {
  if (user && req.body.email!==req.body.oldEmail) {
      let errors = "Email already exists";
    
      
      return res.json({ status: 400, message: errors });
  } 
  else{

    Schema.users.update(
      { email: `${req.body.oldEmail}` },
      Update_To,
      function (err, result) {
        if (err) {
          console.log(err)
          res.send(err);
        } else {
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
  }});
  } catch (err) {
    console.log(err);
  }
};
