import React from "react";
import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import Label_Input from "../Label_Input.js";
import { Form } from "../../../components/Form";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
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

class ChangePass extends React.Component {
    constructor() {
      super();
      this.state = {
        Password: "",
        Confirm: "",
        OldPassword: "",
        Updated: false,
        disab: true,
        click: false,
        text: "Password and Confirm password must be the same",
      };
    }


    handleChange = (e) => {
      switch (e.target.id) {
        case "Password":
          this.setState({ Password: e.target.value }, () => {
            if (this.state.Password == this.state.confirm) {
              this.setState({ disab: false });
            } else {
              this.setState({ disab: true });
            }
          });
          break;
        case "Confirm":
          this.setState({ Confirm: e.target.value }, () => {
            if (this.state.Password == this.state.Confirm) {
              this.setState({ disab: false });
            } else {
              this.setState({ disab: true });
            }
          });
          break;
          case "OldPassword":
          this.setState({ OldPassword: e.target.value });
        default:
          this.setState({ rand: e.target.value });
          break;
      }
    };

    handleSubmit = (e) => {
      this.setState({ click : true }, () => {
  
        e.preventDefault();
        if (this.state.disab && this.state.click) {
          alert("Pass and verify pass must be the same !");
        }
      else {
        try {
          fetch("http://localhost:3001/NewPass", {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: this.state.OldPassword,
              newpass: this.state.Confirm,
              
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.error){ alert(json.error);}
              else this.setState({ Updated: true });
            })
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
        
      }
    })

  }

    render() {
      if (!this.state.Updated)
        return (
        <>
          <div className="col-12 title">
          <h1>Change Password</h1>
        </div>
                <Form onSubmit={this.handleSubmit} className="col-12- px-auto">
            <Card>
              <div className="card-title">
                
              </div>
              <div className="card-body light-text">
                <div>
                <div className="input-block">
                    <Label_Input
                      id="OldPassword"
                      type="text"
                      name="Old Password : "
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>
                <div className="input-block">
                    <Label_Input
                      id="Password"
                      type="password"
                      name="Your Password : "
                      onChange={this.handleChange}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="Confirm"
                      type="password"
                      name="Confrim Password : "
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
                  justifyContent: "center",

                  margin: "auto",
                }}
                className="card-actions flex-end"
              >
                {this.state.disab && this.state.click ? (
                  <p style={{ textAlign: "center", color: "red" }}>
                    Password and Confirm Password must be the same
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
        )
        return (
          <div style={{ textAlign: "center" }}>
            {alert("updated successfully")}
          </div>
        );
    }

}


export default ChangePass;