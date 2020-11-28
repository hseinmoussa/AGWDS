// const Schema = require("../Schema/Schema.js");
// const test_function = require("./function/test_input_function");
const Schema = require("../Schema/Schema.js");

exports.Try = async function (req, res) {

    try {
      Schema.users
        .find(function (err, data) {
          if (err) console.log("Somthing went wrong!");
          else console.log("ok");
        })
        .then((data) => {
          console.log(  data );
        });
    } catch (err) {
      console.log(err);
    }
  };

