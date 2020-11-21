const connect = require("../connect.js");
const mongoose = require("mongoose");

//_id is same as email
var users_schema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);
var cards_schema = new mongoose.Schema({
  Title: { type: String },
  Img: { type: String },
  description: { type: String },
  categories: { type: String },
  Views: Number,
});
var contact_schema = new mongoose.Schema({
  FirstName: { type: String },
  LastName: { type: String },
  DOB: { type: String },
  address: { type: String },
  tel: { type: String },
  email: { type: String },
});

var social_schema = new mongoose.Schema({
  facebook: {
    data: String,
  },
  twitter: {
    data: String,
  },
  linkedin: {
    data: String,
  },
  gmail: {
    data: String,
  },
  github: {
    data: String,
  },
});
var about_schema = new mongoose.Schema({
  title: { type: String },
  about_img: { type: String },
  about_description: { type: String },
});
// firstName: { type: String, required: true },
// lastName: { type: String, required: true },
// email: { type: String, required: true },
// password: { type: String, required: true },
// address: { type: String, required: false },
const users = mongoose.model("users", users_schema);
const cards = mongoose.model("cards", cards_schema);
const contact = mongoose.model("contacts", contact_schema);
const about = mongoose.model("about", about_schema);
const social = mongoose.model("social", social_schema);

module.exports = {
  users: users,
  cards: cards,
  contact: contact,
  about: about,
  social: social,
};
