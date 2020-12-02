import React, { Component, useEffect, useState } from "react";

import { Link } from 'react-router-dom'
import "./nav.css";
import { MenuItems } from "./MenuItems";
import { Button } from "./button";
import SearchBarM from "./searchbar-mobile.js";
import SearchBar from "./searchbar";
import { BM } from "./button-mobile";
class Navbar extends Component {

  state = { clicked: false, search: "" };



  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
 
  }

  handleInput = (e) => {
      this.setState({...this.state, search: e.target.value })
  
  }


  handleSubmit = (props) => {
    this.props.handleSearch({search : this.state.search })
  }

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">ART GALLERY</h1>

        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <div className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className="nav-list">
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}

        </ul>
        <form className="SF" onSubmit={(e) => {e.preventDefault(); this.handleSubmit() }} >
          <Button>
            <i className="fas fa-search"></i>
          </Button>

          <input
            className="SB"
            onChange={this.handleInput}
            label="Search Gallery"
            type="text"
            placeholder="Search Art..."
            required
          />
        </form>
      </nav>
    );
  }
}
export default Navbar;
