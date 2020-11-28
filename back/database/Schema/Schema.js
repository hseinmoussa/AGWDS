const connect = require("../connect.js");
const mongoose = require("mongoose");

//_id is same as email
var users_schema = new mongoose.Schema(
  {
   
    email: { type: String, required: true },
    password: { type: String, required: true },
    FirstName: { type: String },
    LastName: { type: String },
  },
  
);
var cards_schema = new mongoose.Schema({
  Title: { type: String },
  Image: { type: String },
  description: { type: String },
  categories: { type: String },
  Views: Number,
});


var social_schema = new mongoose.Schema({
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  gmail: {
    type: String,
  },
  github: {
    type: String,
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
const about = mongoose.model("about", about_schema);
const social = mongoose.model("social", social_schema);

module.exports = {
  users: users,
  cards: cards,
  about: about,
  social: social,
};
