import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/nav";
// import Aboutus from "./components/About-us/Aboutus-h.js";
// import AS1 from "./components/About-us/section1.js";
import Cardsbox from "./components/Cardsbox/Cardsbox"

//hsein
import Footer from "./components/Footer/Footer.js";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {/* <Aboutus />
        <AS1 /> */}
        <Cardsbox />
        <Footer />
      </div>
    );
  }
}

export default App;
