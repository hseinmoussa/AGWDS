const Schema = require("../Schema/Schema.js");
const test_function = require("./function/test_input_function");

exports.Try = async function (req, res) {
  try {
    var newCard = {
      Title: "card1",
      description: "it's first card",
      categories: "wowww",
      Views: 10,
      Img: "",
    };
    //const admin = new Admin(newAdmin);
    const card = new Schema.cards(newCard);
    await card
      .save()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => console.log(err));

    Schema.cards
      .find(function (err, data) {
        if (err) console.log("Somthing went wrong!");
      })
      .then((cards) => {
        console.log(cards);
      });
  } catch (err) {
    console.log(err);
  }
  var UserInfo = {
    FirstName: "karim",
    LastName: "Farra",
    DOB: "1-1-1998",
    address: "Lebanon",
    tel: "03000000",
    email: "email.com",
  };
  console.log(UserInfo);
  const admin = new Schema.contact(UserInfo);
  await admin
    .save()
    .then((user) => {
      console.log(user);
    })
    .catch((err) => console.log(err));

  var social = {
    facebook: { data: "q" },
    twitter: { data: "w" },
    github: { data: "e" },
    gmail: { data: "r" },
    linkedin: { data: "t" },
  };
  const admin2 = new Schema.social(social);
  await admin2
    .save()
    .then((data) => {
      res.json({ message: data });
    })
    .catch((err) => console.log(err));
};
