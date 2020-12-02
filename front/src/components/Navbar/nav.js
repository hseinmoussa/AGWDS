import React, { Component, useEffect, useState } from "react";
import "./nav.css";
import { MenuItems } from "./MenuItems";
import { Button } from "./button";
import SearchBarM from "./searchbar-mobile.js";
import SearchBar from "./searchbar";
import { BM } from "./button-mobile";
class Navbar extends Component {
  state = { clicked: false, searchfiled: "" };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

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
          <form class="SF-mobile" method="GET">
            <BM>
              <i className="fas fa-search"></i>
            </BM>

            <SearchBarM />
          </form>
        </div>
        <form class="SF" method="GET">
          <Button>
            <i className="fas fa-search"></i>
          </Button>

          <SearchBar
            handleChange={(e) => this.setState({ searchfield: e.target.value })}
          />
        </form>
      </nav>
    );
  }
}
export default Navbar;
