import React, { useEffect } from "react";

// Icons
// import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from 'react-icons/fi';

import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import Label_Input from "../../../../components/Label_Input.js";
import { Form } from "../../../components/Form";

// This styled only show buttons in row format
import styled from "styled-components";
import Column from "antd/lib/table/Column";
import { Row } from "antd";
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

class CardsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: "",
      Updated: false,
      disab: true,
      click: false,
      text: "Password and Verify password must be the same",
    };
  }

  handleChange = (event) => {
    //console.log(event.target.name, event.target.value);
    switch (event.target.id) {
      case "email":
        this.setState({ Email: event.target.value });
        break;
      case "pass":
        this.setState({ Password: event.target.value }, () => {
          if (this.state.Password == this.state.VerifyPass) {
            this.setState({ disab: false });
          } else {
            this.setState({ disab: true });
          }
        });
        break;
      case "confirm pass":
        this.setState({ VerifyPass: event.target.value }, () => {
          if (this.state.Password == this.state.VerifyPass) {
            this.setState({ disab: false });
          } else {
            this.setState({ disab: true });
          }
        });
        break;
      default:
        this.setState({ rand: event.target.value });
        break;
    }
  };

  handleSubmit = (event) => {
    this.setState({ click: true });
    event.preventDefault();
    try {
      fetch("http://localhost:3001/NewAdmin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: this.state.Email,
          email: this.state.Email,
          password: this.state.Password,
          verifypassword: this.state.VerifyPass,
        }),
      })
        .then((res) => {
          console.log(1);
          return res.json();
        })
        .then((json) => {
          if (json.status == 401) alert(json.message);
          else this.setState({ Updated: true });
        })
        .catch((err) => console.log(err));
      event.preventDefault();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (!this.state.Updated)
      return (
        <>
          <div className="col-12 title">
            <h1>Cards</h1>
          </div>

          <Form onSubmit={this.handleSubmit} className="col-12 px-auto">
            <Card>
              <div className="card-title">
                <h3>Card With Action</h3>
              </div>
              <div className="card-body light-text">
                <p>To Add New users</p>
                <div>
                  <div className="input-block">
                    <Label_Input
                      id="email"
                      name="Your New Email Address : "
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="pass"
                      name="Your Password : "
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="confirm pass"
                      name="Verify Password : "
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>

                  <br></br>
                  <p>
                    <span style={{ color: "red" }}> * </span>
                    {this.state.disab ? this.state.text : ""}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
                className="card-actions flex-end"
              >
                {this.state.disab && this.state.click ? (
                  <p style={{ textAlign: "center", color: "red" }}>
                    Pass and Verify Pass must be the same
                  </p>
                ) : (
                  ""
                )}

                <Button className="success btn-circle">Submit</Button>
              </div>
            </Card>
          </Form>
        </>
      );
    else return <div style={{ textAlign: "center" }}>updated successfully</div>;
  }
}
export default CardsPage;
