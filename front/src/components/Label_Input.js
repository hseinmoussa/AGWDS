import "./styles/Label_Input.css";
import React from "react";

class Label_Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <span>
          <input
            id={this.props.name}
            type={this.props.type}
            value={this.props.value}
            name={this.props.name}
            onChange={this.props.onChange}
            required={this.props.required}
          />
          {this.props.required ? (
            <span style={{ color: "red" }}> * </span>
          ) : null}
        </span>
      </>
    );
  }
}

export default Label_Input;
