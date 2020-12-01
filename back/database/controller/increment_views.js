const Schema = require("../Schema/Schema.js");

exports.increment = async function (req, res) {
  if(req.body._id==undefined)
    return res.json({ status:400,message: "Error!" });
  try {
    Schema.cards.findOneAndUpdate({ _id: req.body._id }, { $inc: {'Views': 1 } }, {new: true },function(err, response) {
      if (err) {
        res.json({ status:400,message: "Something Wrong!" });
           } else {
            res.json({ status:200,message: "Okk" });
          }
  })} catch (err) {
    console.log(err);
  }
};
