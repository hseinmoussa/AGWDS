const connect = require("../connect.js");
const Schema = require("../Schema/Schema.js");
const test_function = require("./function/test_input_function");
const bcrypt = require("bcrypt");

exports.New_Admin_Controller = async function (req, res) {
  function test_input(data) {
    data = data.trim();
    data = test_function.stripslashes(data);
    data = test_function.htmlspecialchars(data);
    return data;
  }

  try {
    //console.log(test_input("hh<htm   l>  ////0 &  "));
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    var newAdmin = {
      _id: test_input(req.body.email),
      email: test_input(req.body.email),
      password: test_input(hashedPassword),
    };
    //const admin = new Admin(newAdmin);
    const admin = new Schema.users(newAdmin);
    await admin
      .save()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));

    Schema.users
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
      })
      .then((admin) => {
        res.json({ status: 200, message: admin });
      });
  } catch (err) {
    console.log(err);
  }
};
