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
} from "react-router-dom";
import Protection from './components/LoginPage/Protection';
import NotFound from './components/Not_Found/NotFound'

const Dashboard = () => <Routes />;

class App extends React.Component {
  render() {
    return (
      <Router>
  
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Cardsbox />
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
                <Cardsbox/>
                <LoginPage />
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
