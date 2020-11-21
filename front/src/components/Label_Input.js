import "./styles/Label_Input.css";
import React from "react";

class Label_Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.name}</label>
        <span>
          <input
            type={this.props.type}
            name={this.props.name}
            id={this.props.id}
            onChange={(e) => {
              this.props.onChange(e);
            }}
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
