import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { MenuItems } from "./MenuItems";
import { Button } from "./button";
import { BM } from "./button-mobile";

class Navbar extends Component {
  state = { clicked: false, search: "" };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleInput = (e) => {
    this.setState({ ...this.state, search: e.target.value });
  };

  handleSubmit = (props) => {
    this.props.handleSearch({ search: this.state.search });
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
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          })}
          <form
            class="SF-mobile"
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit();
            }}
          >
            <BM>
              <i className="fas fa-search"></i>
            </BM>

            <input
              className="SB-mobile"
              onChange={this.handleInput}
              label="Search Gallery"
              type="text"
              placeholder="Search Art..."
              required
            />
          </form>
        </div>
        <form
          className="SF"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
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
