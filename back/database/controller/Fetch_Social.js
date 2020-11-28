const Schema = require("../Schema/Schema.js");

exports.Fetch_Social = async function (req, res) {
  try {
    /*Hayde l part b3mela run mara w bma7iya*/

    // var UserInfo = {
    //   FirstName: req.body.FirstName,
    //   LastName: req.body.LastName,
    //   DOB: req.body.DOB,
    //   address: req.body.address,
    //   tel: req.body.tel,
    //   email: req.body.email,
    //   social: {
    //     facebook: { data: req.body.facebook },
    //     twitter: { data: req.body.twitter },
    //     github: { data: req.body.github },
    //     gmail: { data: req.body.gmail },
    //     linkedin: { data: req.body.linkedin },
    //   },
    // };
    // console.log(UserInfo);
    // const admin = new Schema.contact(UserInfo);
    // await admin
    //   .save()
    //   .then((user) => {
    //     console.log(user.social);
    //   })
    //   .catch((err) => console.log(err));

    /*Delete Schema*/

    // Schema.contact
    //   .deleteMany({ __v: 0 })
    //   .then(function () {
    //     console.log("Data deleted"); // Success
    //   })
    //   .catch(function (error) {
    //     console.log(error); // Failure
    //   });

    Schema.social
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
        else console.log(data);
      })
      .then((data) => {
        res.json({ message: data[0] });
      });
  } catch (err) {
    console.log(err);
  }
};
