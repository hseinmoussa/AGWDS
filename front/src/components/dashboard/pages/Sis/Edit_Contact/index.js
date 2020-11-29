import React, { useEffect, useState } from "react";
import Label_Input from "../Label_Input.js";

// Icons
import { FiFile } from "react-icons/fi";

import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import Cookies from "universal-cookie";
// This styled only show buttons in row format
import styled from "styled-components";
const cookies = new Cookies();

const Buttons = styled.div`
  display: flex;

  &.wrap {
    flex-wrap: wrap;
  }
  /* justify-content: space-around; */

  button {
    margin: 5px;
  }
`;
class FormsPage extends React.Component {
  constructor() {
    super();
    this.state = { FirstName: "", LastName: "", Updated: false };
  }

  handleChange = (event) => {
    switch (event.target.name) {
      case "Your old Email : ":
        this.setState({ OldEmail: event.target.value });
        break;
      case "FirstName : ":
        this.setState({ FirstName: event.target.value });
        break;
      case "LastName : ":
        this.setState({ LastName: event.target.value });
        break;
      
      case "Email Address : ":
        this.setState({ Email: event.target.value });
        break;
      case "Facebook : ":
        this.setState({ Facebook: event.target.value });
        break;
      case "Twitter : ":
        this.setState({ Twitter: event.target.value });
        break;
      case "Github : ":
        this.setState({ Github: event.target.value });
        break;
      case "Linkedin : ":
        this.setState({ Linkedin: event.target.value });
        break;
      case "Gmail : ":
        this.setState({ Gmail: event.target.value });
        break;
    }
  };

  handleSubmit = (event) => {
    fetch("http://localhost:3001/Update_Contact", {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({
        OldEmail: this.state.OldEmail,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        
        email: this.state.Email,
        facebook: this.state.Facebook,
        twitter: this.state.Twitter,
        github: this.state.Github,
        gmail: this.state.Gmail,
        linkedin: this.state.Linkedin,
      }),
    })
      .then((res) => res.json())
      .then((json) =>{
        if (json.status == 401 || json.status == 400)  return alert(json.message);

        this.setState({
          Updated: true,
        })
        window.location.reload();
      }
      );
    event.preventDefault();
  };

  render() {
    if (!this.state.Updated)
      return (
        <>
          <div className="col-12 title px-auto">
            <h1>Edit Contact</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="col-12 px-auto">
            <Card>
              <div className="card-title">
                <h3>Simple Form</h3>
              </div>
              <div className="card-body">
                <div>
                  <div className="input-block">
                    <Label_Input
                      name="Your old Email : "
                      type={this.state.value}
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="FirstName : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="LastName : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                 
                
                  <div className="input-block">
                    <Label_Input
                      name="Email Address : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Twitter : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Github : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Linkedin : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Facebook : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Gmail : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",

                  margin: "auto",
                }}
                className="card-actions  "
              >
                <Button
                  style={{ minWidth: "250px" }}
                  className="success btn-circle"
                >
                  Submit
                </Button>
              </div>
            </Card>
          </Form>
        </>
      );
    else
      return (
        <div style={{ textAlign: "center" }}>
          {alert("updated successfully")}
        </div>
      );
  }
}
export default FormsPage;
