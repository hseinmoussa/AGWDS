import React, { useEffect, useState } from "react";
import Label_Input from "../../../../components/Label_Input.js";

// Icons
import { FiFile } from "react-icons/fi";

import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";

// This styled only show buttons in row format
import styled from "styled-components";
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
    //console.log(event.target.name, event.target.value);
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
      case "Date Of Birthday : ":
        this.setState({ DOB: event.target.value });
        break;
      case "Address : ":
        this.setState({ Address: event.target.value });
        break;
      case "Telephone number : ":
        this.setState({ tel: event.target.value });
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        OldEmail: this.state.OldEmail,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        DOB: this.state.DOB,
        address: this.state.Address,
        tel: this.state.tel,
        email: this.state.Email,
        facebook: this.state.Facebook,
        twitter: this.state.Twitter,
        github: this.state.Github,
        gmail: this.state.Gmail,
        linkedin: this.state.Linkedin,
      }),
    })
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          Updated: true,
        })
      );
    event.preventDefault();
  };

  render() {
    if (!this.state.Updated)
      return (
        <>
          <div className="col-12 title px-auto">
            <h1>Forms</h1>
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
                      name="Date Of Birthday : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Address : "
                      type={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      name="Telephone number : "
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
              <div className="card-actions flex-end">
                <Button className="success btn-circle">Submit</Button>
              </div>
            </Card>
          </Form>
        </>
      );
    else return <div style={{ textAlign: "center" }}>updated successfully</div>;
  }
}
export default FormsPage;
