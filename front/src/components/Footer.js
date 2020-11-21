import "./styles/Footer.css";
import React from "react";
import { SocialIcon } from "react-social-icons";

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      facebook: "",
      twitter: "",
      gmail: "",
      linkedin: "",
      github: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:3001/Fetch_Social", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //facebook: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          facebook: json.message.facebook,
          twitter: json.message.twitter,
          gmail: json.message.gmail,
          linkedin: json.message.linkedin,
          github: json.message.github,
        })
      );
  }
  render() {
    return (
      <div className="App">
        <hr></hr>
        <footer className="App-footer">
          <div className="footer-section1">
            <div className="footer-buttons">
              <SocialIcon
                url={"http://gmail.com/" + this.state.gmail}
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url={"http://linkedin.com/" + this.state.linkedin}
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url={"http://twitter.com/" + this.state.twitter}
                style={{ marginRight: "5px" }}
                className="click"
              />
              <SocialIcon
                url={"https://www.github.com/" + this.state.github}
                bgColor="#000"
                style={{ marginRight: "5px" }}
                className="click"
              ></SocialIcon>
              <SocialIcon
                url={"https://www.facebook.com/" + this.state.facebook}
                style={{ marginRight: "5px" }}
                className="click"
              />
            </div>

            {/* <div className="footer-section">Home | AboutMe</div> */}
          </div>
          <div className="footer-section2">
            <p style={{ color: "#fff" }}>
              <i>
                Copyright {"\u00A9"} <b>2020</b>
              </i>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
