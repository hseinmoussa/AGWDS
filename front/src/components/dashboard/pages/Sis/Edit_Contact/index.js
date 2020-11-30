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
import {
  Redirect,
} from "react-router-dom";
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
    this.state = { FirstName: "", LastName: "",
    Facebook:"",
    oldEmail:"",
    Twitter:"",
    Gmail:"",
    Linkedin:"",
    Github:"",
    FirstName:"",
    LastName:"",
    Email:"",
    Updated: false };
  }
  
  componentDidMount() {
    fetch("http://localhost:3001/Fetch_Social", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //facebook: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          Facebook: json.message.facebook,
          Twitter: json.message.twitter,
          Gmail: json.message.gmail,
          Linkedin: json.message.linkedin,
          Github: json.message.github,
        })
      );
      try {
        fetch("http://localhost:3001/Contact", {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
          .then((res) => res.json())
          .then((json) =>
          {
            this.setState({FirstName:json.message.FirstName ,
              LastName: json.message.LastName,
              Email:json.message.email,
              oldEmail:json.message.email})
          }
          );
      } catch (err) {
        console.log(err);
      }
  }

 
  handleChange = (event) => {
    switch (event.target.id) {
   
      case "FirstName":
        this.setState({ FirstName: event.target.value });
        break;
      case "LastName":
        this.setState({ LastName: event.target.value });
        break;
      
      case "newmail":
        this.setState({ Email: event.target.value });
        break;
      case "Facebook":
        this.setState({ Facebook: event.target.value });
        break;
      case "Twitter":
        this.setState({ Twitter: event.target.value });
        break;
      case "Github":
        this.setState({ Github: event.target.value });
        break;
      case "Linkedin":
        this.setState({ Linkedin: event.target.value });
        break;
      case "Gmail":
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
        oldEmail:this.state.oldEmail,
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
        <Redirect
        to={{
          pathname: "/",
        }}
      />}
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
                    id="FirstName"
                      name="FirstName : "
                      type={this.state.value}
                      value={this.state.FirstName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                    id="LastName"
                      name="LastName : "
                      type={this.state.value}
                      value={this.state.LastName}
                      onChange={this.handleChange}
                    />
                  </div>
                 
                
                  <div className="input-block">
                    <Label_Input
                    id="newmail"
                      name="Email Address : "
                      type={this.state.value}
                      value={this.state.Email}
                      onChange={this.handleChange}
                    />
                  </div>
                  
                  <div className="input-block">
                    <Label_Input
                    id="Twitter"
                      name="Twitter : "
                      type={this.state.value}
                      value={this.state.Twitter}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                    id="Github"
                      name="Github : "
                      type={this.state.value}
                      value={this.state.Github}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                    id="Linkedin"
                      name="Linkedin : "
                      type={this.state.value}
                      value={this.state.Linkedin}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                    id="Facebook"
                      name="Facebook : "
                      type={this.state.value}
                      value={this.state.Facebook}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                    id="Gmail"
                      name="Gmail : "
                      type={this.state.value}
                      value={this.state.Gmail}
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
