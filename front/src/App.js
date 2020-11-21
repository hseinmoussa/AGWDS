import "./App.css";
import React from "react";
import { SocialIcon } from "react-social-icons";
import Navbar from "./components/Navbar/nav";
import Aboutus from "./About-us/Aboutus-h.js";
import AS1 from "./About-us/section1.js";

//hsein
import Footer from "./components/Footer.js";
import Dashboard_Contact from "./components/Dashboard_Contact.js";
import Dashboard_New_Admin from "./components/Dashboard_New_Admin.js";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Aboutus />
        <AS1 />

        <hr></hr>
        <footer className="App-footer">
          <div className="footer-section1">
            <div className="footer-buttons">
              <SocialIcon
                url="http://gmail.com"
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url="http://linkedin.com/in"
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url="http://twitter.com"
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url="https://www.github.com"
                bgColor="#000"
                style={{ marginRight: "5px" }}
                className="click"
              ></SocialIcon>
              <SocialIcon
                url="https://www.facebook.com"
                style={{ marginRight: "5px" }}
                className="click"
              />
              <div className="footer-section2">
                <p style={{ color: "#fff" }}>
                  <i className="footer-text">
                    Copyright {"\u00A9"} <b>2020</b>
                  </i>
                </p>
              </div>
            </div>

            {/* <div className="footer-section">Home | AboutMe</div> */}
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
