const Schema = require("../Schema/Schema.js");

exports.Fetch_Social = async function (req, res) {
  try {
   

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
      })
      .then((data) => {
        res.json({ message: data[0] });
      });
  } catch (err) {
    console.log(err);
  }
};
