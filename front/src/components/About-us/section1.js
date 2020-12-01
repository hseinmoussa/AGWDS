import React from "react";
import "./section1.css";
import painting from "./img/painting.jpg";
import hollway from "./img/hollway.jpg";
import entrance from "./img/entrance.jpg";
import  { useEffect, useState, } from "react";

function AS1() {
const [about,setAbout]=useState({"title":"","about_description":"","about_description_title":""})
  useEffect(() => {
   var url = "http://localhost:3001/About";
    try {
      
      fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((json) => {setAbout({
       "title":json.message.title,
       "about_description": json.message.about_description,
       "about_description_title": json.message.about_description_title,


      
      })})
    } catch (err) {
      console.log(err);
    }
  },[]);

  return (
    <section className="section-about">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">
          {about.title}
        </h2>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <h3 className="heading-tertiary u-margin-bottom-small">
            {about. about_description_title}
          </h3>
          <p className="paragraph">
            {about.about_description}
        
          </p>
       
     
        </div>
        <div className="col-1-of-2">
          <div className="composition">
            <img
              src={painting}
              alt="1"
              className="composition__photo composition__photo--p1"
            />
            <img
              src={entrance}
              alt="2"
              className="composition__photo composition__photo--p2"
            />
            <img
              src={hollway}
              alt="3"
              className="composition__photo composition__photo--p3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AS1;
