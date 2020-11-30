const express = require("express");
const app = express();
const New_Admin_Controller = require("./database/controller/New_Admin_Controller");
const Fetch_Social = require("./database/controller/Fetch_Social");
const auth = require("./database/Auth.js");
const isPasswordAndUserMatch = require("./database/login_admin");
let bodyParser = require("body-parser");
import multer from "multer";

const cookieParser = require("cookie-parser");
const Change_Pass_Controller = require("./database/controller/Change_Pass_Controller");
const Forgot_Pass_Controller = require("./database/controller/Forgot_Pass_Controller");
const Change_Pass_By_Email = require("./database/controller/Change_Pass_By_Email");

const Update_Contact = require("./database/controller/Update_Contact");
const Fetch_Contact = require("./database/controller/Fetch_Contact_Info");
const Fetch_Cards = require("./database/controller/Fetch_Cards.js");
const Add_Cards = require("./database/controller/Add_Cards.js");
const Delete_Cards = require("./database/controller/Delete_Card.js");
const Edit_Card = require("./database/controller/Edit_Card.js");
const Search_Card = require("./database/controller/Search_Card.js");
const Fetch_Aboutme = require("./database/controller/Fetch_Aboutme.js");
const Edit_About = require("./database/controller/Edit_Aboutme.js");
const Fetch_Admins = require("./database/controller/Fetch_Admins.js");


const Try = require("./database/controller/Try.js");



var cors = require("cors");
const corsOptions = {

  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
//image
app.use(express.static("public"));
const multerStorage = multer.diskStorage({
  destination: "public/Image",
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();
    // filename will be: image-1345923023436343-filename.png
    const filename = `${fieldname}-${date}-${originalname}`;
   
    cb(null, filename);
  },
});

const upload = multer({ storage: multerStorage, fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    req.fileValidationError='Only .png, .jpg and .jpeg format allowed!';
    return cb(null, false,new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
} });

const port = process.env.PORT || 3001;

app.post("/Fetch_Social", [Fetch_Social.Fetch_Social]);

app.post("/NewAdmin", auth, New_Admin_Controller.New_Admin_Controller);
app.post("/login", [isPasswordAndUserMatch.isPasswordAndUserMatch]);
app.put("/Update_Contact", auth, Update_Contact.Update_Contact);

//app.get("/NewAdmin", New_Admin_Controller.New_Admin_Controller);
app.get("/checking/:id", [Change_Pass_By_Email.checking]);
app.post("/ForgotPass", [Forgot_Pass_Controller.Forgot_Pass]);
app.post("/NewPass", [auth, Change_Pass_Controller.Change_Pass]);

app.post("/Contact", Fetch_Contact.Fetch_Contact);
app.post("/Cards", Fetch_Cards.Fetch_Cards);
app.post("/CardsByViews", Fetch_Cards.Fetch_Cards_By_Views);


app.post("/AddCard", upload.single("Image"), [ auth, Add_Cards.Add_Cards]);

app.post("/DeleteCard", auth, Delete_Cards.Delete_Cards);
app.post("/EditCard", auth, upload.single("Image"), Edit_Card.Edit_Card);
app.post("/SearchCard", auth, Search_Card.Search_Card);
app.post("/About", Fetch_Aboutme.Fetch_Aboutme);
app.post("/EditAbout", Edit_About.Edit_About);
app.post("/AllAdmins", Fetch_Admins.Fetch_Admins);



//Try
app.get("/Try", Try.Try);


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
