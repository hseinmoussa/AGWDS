import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/nav";
import Aboutus from "./components/About-us/Aboutus-h.js";
import AS1 from "./components/About-us/section1.js";
import Cardsbox from "./components/Cardsbox/Cardsbox";
import LoginPage from "./components/LoginPage/login";
import Footer from "./components/Footer/Footer.js";
import Routes from "./components/dashboard/routes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Dashboard = () => <Routes />;

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    {
      /* <Aboutus />
          <AS1 /> */
    }
    return (
      <Router>
        <Link to="/">home </Link>
        <Link to="/about">about </Link>
        <Link to="/dashboard">dashboard </Link>
        <a href="/login">login </a>
        <Switch>
          <div className="App">
            <Navbar />
            <Route exact path="/">
              <Cardsbox />
            </Route>
            <Route path="/about">
              <Aboutus />
              <AS1 />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/login">
              <LoginPage />
              <Cardsbox/>
            </Route>
          </div>
        </Switch>

        <Footer />
      </Router>
    );
  }
}

export default App;
