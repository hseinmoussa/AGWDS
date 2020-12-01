import React from "react";

// Icons
// import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from 'react-icons/fi';

import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import Label_Input from "../Label_Input.js";
import { Form } from "../../../components/Form";

// This styled only show buttons in row format
import styled from "styled-components";
import Cookies from "universal-cookie";
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

class CardsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      Password: "",
      FirstName:"",
      LastName:"",
      disab: true,
      click: false,
      text: "Password and Verify password must be the same",
      token : cookies.get('token'),
    };
  }


  handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        this.setState({ Email: event.target.value });
        break;
        case "FirstName":
          this.setState({ FirstName: event.target.value });
          break;
          case "LastName":
            this.setState({ LastName: event.target.value });
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
    this.setState({ click: true }, () => {

      event.preventDefault();
      if (this.state.disab && this.state.click)
        alert("Pass and verify pass must be the same !");
      else {
        try {
          fetch("http://localhost:3001/NewAdmin", {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({
             
              email: this.state.Email,
              password: this.state.Password,
              verifypassword: this.state.VerifyPass,
              FirstName:this.state.FirstName,
              LastName:this.state.LastName,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.status == 401 || json.status == 400) alert(json.message);
              if(json.redirect == true){
                window.location.replace(json.location)
              }
              else {alert("New Admin Added");
              window.location.replace("/dashboard")
        
            }
              
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
      
      }
    });
  };

  render() {
      return (
        <>
          <div className="col-12 title">
            <h1>New Admin</h1>
          </div>

          <Form onSubmit={this.handleSubmit} className="col-12 px-auto">
            <Card>
              <div style={{display:"flex",flexDirection:"row"}}>
                <div>
                  <div className="card-title">
                    <h3>New Admin</h3>
                  </div>
                  <div className="card-body light-text">
                    <p> Add New users</p>
                    <div>
                      <div className="input-block">
                        <Label_Input
                          id="email"
                          type="email"
                          name="Your New Email Address : "
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                      <div className="input-block">
                        <Label_Input
                          id="FirstName"
                          type="text"
                          name="Your First Name : "
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                      <div className="input-block">
                        <Label_Input
                          id="LastName"
                          type="text"
                          name="Your Last Name : "
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                      <div className="input-block">
                        <Label_Input
                          id="pass"
                          type="password"
                          name="Your Password : "
                          onChange={this.handleChange}
                          required={true}
                        />
                      </div>
                      <div className="input-block">
                        <Label_Input
                          id="confirm pass"
                          type="password"
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
                </div>
         
                
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",

                  margin: "auto",
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
                <p></p>

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
  
  }
}
export default CardsPage;
