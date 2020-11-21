const express = require("express");
const app = express();
const New_Admin_Controller = require("./database/controller/New_Admin_Controller");
const Fetch_Social = require("./database/controller/Fetch_Social");
const auth = require("./database/Auth.js");
const isPasswordAndUserMatch = require("./database/login_admin");
let bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Change_Pass_Controller = require("./database/controller/Change_Pass_Controller");
const Forgot_Pass_Controller = require("./database/controller/Forgot_Pass_Controller");
const Change_Pass_By_Email = require("./database/controller/Change_Pass_By_Email");

const Update_Contact = require("./database/controller/Update_Contact");

var cors = require("cors");
app.use(cors());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

app.post("/Fetch_Social", [Fetch_Social.Fetch_Social]);

app.post("/NewAdmin", [auth, New_Admin_Controller.New_Admin_Controller]);
app.post("/login", [isPasswordAndUserMatch.isPasswordAndUserMatch]);
app.put("/Update_Contact", [Update_Contact.Update_Contact]);

//app.get("/NewAdmin", New_Admin_Controller.New_Admin_Controller);
app.get("/checking/:id", [Change_Pass_By_Email.checking]);
app.post("/ForgotPass", [Forgot_Pass_Controller.Forgot_Pass]);
app.post("/NewPass", [auth, Change_Pass_Controller.Change_Pass]);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
