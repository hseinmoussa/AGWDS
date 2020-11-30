import React from "react";
import "./section2.css";
import painter from "./img/painter.jpg";
// import golden from "./img/golden.mp4";
// import golden1 from "./img/golden1.webm";
import  { useEffect, useState, } from "react";
function AS2() {
    const [about,setAbout]=useState({"about_description2":"",
    "about_description_title2":"",
  "Name":"",
  })
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
           "about_description2": json.message.about_description2,
           "about_description_title2": json.message.about_description_title2,
    "Name":json.message.Name,
    
          
          })})
        } catch (err) {
          console.log(err);
        }
      },[]);
  return (
    <section className="section-stories">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          {/* <source src={golden} type="video/mp4" /> */}
          {/* <source src={golden1} type="video/webm" /> */}
          your browser is not supported!!
        </video>
      </div>
      <div className="u-center-text u-margin-bottom-big">
  <h2 className="heading-secondary">{about.about_description_title2}</h2>
      </div>
      <div className="row">
        <div className="kstory">
          <figure className="kstory__shape">
            <img
              src={painter}
              alt="person on a tour "
              className="kstory__image"
            />
            <figcaption className="kstory__caption">{about.Name}</figcaption>
          </figure>
          <div className="kstory__text">
            <h3 className="heading-tertiary u-margin-bottom-small">
              Who am i?
            </h3>
            <p>
            {about.about_description2}
          
            </p>
          </div>
        </div>
      </div>

      <div className="u-center-text u-margin-top-huge">
        <a href="/" className="btn-text">
          Home Page &rarr;
        </a>
      </div>
    </section>
  );
}

export default AS2;
