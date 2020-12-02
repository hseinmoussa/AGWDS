const Schema = require("../Schema/Schema.js");

exports.Delete_Admin = async function (req, res) {
  try {
    if (req.body._id == undefined || req.body._id == "") {
      res.json({ status: 400, message: "Id doesn't exist" });
    } else {
      Schema.users
        .findOne({ _id: `${req.body._id}` }, (err, docs) => {
          if (err) {
            res.json({ status: 400, message: "Admin doesn't exist" });
          } else {
          }
        })
        .then((data) => {

          Schema.users
            .deleteOne({ _id: `${req.body._id}` }, function (err, dat) {
              if (err) console.log(err);
            })
            .then(async (data) => {
              res.json({ status: 200, message: "okk" });

            });
      
        });
    }
  } catch (err) {
    console.log(err);
  }
};
