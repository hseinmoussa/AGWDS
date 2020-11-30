import React, { useEffect } from "react";

// Icons
// import { FiCalendar, FiMessageCircle, FiLogOut, FiUsers } from 'react-icons/fi';

import { Card } from "../../../components/Card";
import { Button } from "../../../components/Button";
import Label_Input from "../Label_Input.js";
import { Form } from "../../../components/Form";



// This styled only show buttons in row format
import styled from "styled-components";
import Column from "antd/lib/table/Column";
import Cookies from "universal-cookie";
import { Row } from "antd";
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

class EditAbout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      about_description_title: "",
      about_description:"",
      about_description_title2: "",
      about_description2:"",
      Name:"",
      about_img:"",
      Updated: false,
     };
  }

  componentDidMount() {
    fetch("http://localhost:3001/About", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //facebook: this.state.input,
      }),
    })
      .then((res) => res.json())
      .then((json) =>
        this.setState({
   
          title: json.message.title,
          about_description_title: json.message.about_description_title,
          about_description: json.message.about_description,
          about_description_title2: json.message.about_description_title2,
          about_description2: json.message.about_description2,
          Name:json.message.Name,
        })
      );
  }
  handleChange = (event) => {
    switch (event.target.id) {
      case "title":
        this.setState({ title: event.target.value });
        break;
    case "title_description":
      this.setState({ about_description_title: event.target.value });
      break;
    case "description":
      this.setState({ about_description: event.target.value });
      break;
      case "title_description2":
        this.setState({ about_description_title2: event.target.value });
        break;
        case "description2":
          this.setState({ about_description2: event.target.value });
          break;
          case "Name":
            this.setState({ Name: event.target.value });
            break;
       
          
    case "about_img":
      this.setState({ about_img: event.target.files[0] });

      break;
     
    default:
      this.setState({ rand: event.target.value });
      break;
    }
  };
  ChangeState = () => {
     this.setState({ Updated: !this.state.Updated });
  }
  handleSubmit = (event) => {
    this.setState({ click: true }, () => {

      event.preventDefault();
   
        try {
          const body = new FormData();
          body.append("title", this.state.title);
          body.append("about_description_title", this.state.about_description_title);
          body.append("about_description", this.state.about_description);
          body.append("about_description_title2", this.state.about_description_title2);
          body.append("about_description2", this.state.about_description2);
          body.append("Name", this.state.Name);
          body.append("about_img", this.state.about_img);

          fetch("http://localhost:3001/EditAbout", {
            method: "post",
            credentials: "include",
        
            body: body,
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.status == 401 || json.status == 400) alert(json.message);
              
              else alert("updated successfully");
              
            })
            .catch((err) => console.log(err));
          event.preventDefault();
        } catch (err) {
          console.log(err);
        
      }
    });
  };

  render() {
      return (
        <>
          <div className="col-12 title">
            <h1>Edit About Me</h1>
          </div>

          <Form onSubmit={this.handleSubmit} className="col-12 px-auto">
            <Card>
              <div className="card-title">
                <h3>About Me</h3>
              </div>
              <div className="card-body light-text">
                <p> Edit About Me</p>
                <div>
                  <div className="input-block">
                    <Label_Input
                      id="title"
                      type="text"
                      name="New title"
                      onChange={this.handleChange}
                      value={this.state.title}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="title_description"
                      type="text"
                      name="Title Description :"
                      onChange={this.handleChange}
                      value={this.state.about_description_title}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="description"
                      type="text"
                      name="Description :"
                      onChange={this.handleChange}
                      value={this.state.about_description}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="title_description2"
                      type="text"
                      name="Title Description 2 :"
                      onChange={this.handleChange}
                      value={this.state.about_description_title2}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="description2"
                      type="text"
                      name="Description 2 :"
                      onChange={this.handleChange}
                      value={this.state.about_description2}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="Name"
                      type="text"
                      name="My Name :"
                      onChange={this.handleChange}
                      value={this.state.Name}
                      required={true}
                    />
                  </div>
                  <div className="input-block">
                    <Label_Input
                      id="about_img"
                      type="file"
                      name="Image "
                      onChange={this.handleChange}
                      required={true}
                    />
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
export default EditAbout;
