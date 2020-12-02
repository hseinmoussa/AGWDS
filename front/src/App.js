import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/nav";
import Aboutus from "./components/About-us/Aboutus-h.js";
import AS1 from "./components/About-us/section1.js";
import AS2 from "./components/About-us/section2.js";
import Cardsbox from "./components/Cardsbox/Cardsbox";
import LoginPage from "./components/LoginPage/login";
import Footer from "./components/Footer/Footer.js";
import Routes from "./components/dashboard/routes";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Protection from './components/LoginPage/Protection';
import NotFound from './components/Not_Found/NotFound'

import Cookies from "universal-cookie";

const cookies = new Cookies();
const Dashboard = () => <Routes />;

class App extends React.Component {
  state = { search: "", pushed: false };


  handleSearch = (props) => {
    this.setState({ search: props.search , pushed : true })
  }

  
  render() {
  
    return (
      <Router>
  
          <div className="App">
            <Navbar handleSearch={this.handleSearch} />
            <Switch>
              <Route exact path="/">
                <Cardsbox search={this.state} />
              </Route>
              <Route path="/about">
                <Aboutus />
                <AS1 />
                <AS2 />
              </Route>
              <Protection path="/dashboard" >
                <Dashboard />
              </Protection>
              
              <Route path="/login">
              {!cookies.get("token") ? (
                <>
                  <LoginPage />
                  <Cardsbox search={this.state}/>
                </>
              ) : (
                <Redirect
                  to={{
                    pathname: "/dashboard",
                  }}
                />
              )}
            </Route>
              <Route> <NotFound /></Route>
            </Switch>
          </div>
       
        <Footer />
      </Router>
    );
  }
}

export default App;

