import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/nav";
import Aboutus from "./components/About-us/Aboutus-h.js";
import AS1 from "./components/About-us/section1.js";
import Cardsbox from "./components/Cardsbox/Cardsbox";
import LoginPage from "./components/LoginPage/login";
import Footer from "./components/Footer/Footer.js";
import Routes from "./components/dashboard/routes";
import Protection from "./components/LoginPage/Protection";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Cookies from "universal-cookie";

const Dashboard = () => <Routes />;
const cookies = new Cookies();

class App extends React.Component {
  render() {
    return (
      <Router>
        <Link to="/">home </Link>
        <Link to="/about">about </Link>
        <Link to="/dashboard">dashboard </Link>
        <a href="/login">login </a>

        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Cardsbox />
            </Route>
            <Route path="/about">
              <Aboutus />
              <AS1 />
            </Route>
            <Protection path="/dashboard">
              <Dashboard />
            </Protection>
            <Route path="/login">
              {!cookies.get("token") ? (
                <>
                  <LoginPage />
                  <Cardsbox />
                </>
              ) : (
                <Redirect
                  to={{
                    pathname: "/dashboard",
                  }}
                />
              )}
            </Route>
          </Switch>
        </div>

        <Footer />
      </Router>
    );
  }
}

export default App;
