import React, { Component, useEffect, useState } from "react";
import "./nav.css";
import { MenuItems } from "./MenuItems";
import { Button } from "./button";
import { Combobox } from "downshift";
import { Input } from "antd";

class Navbar extends Component {
  state = { clicked: false, search: "" };
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
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <form class="SF" method="GET">
          <Button>
            <i className="fas fa-search"></i>
          </Button>

          <input
            class="SB"
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
