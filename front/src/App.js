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
        <Footer />
      </div>
    );
  }
}

export default App;
