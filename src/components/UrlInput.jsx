import React, { Component } from "react";
import styles from "../App.css";
import { Button } from "react-materialize";

class UrlInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        value: "",
        error: ""
      }
    };
  }

  onChange = (e) => {
    this.setState({ input: { value: e.target.value } })
  }

  render() {
    const { value } = this.state.input;
    return (
      <div className="Wrapper">
        <h3 className="Title">Short Your URLS Here!</h3>
        <div className="Input">
          <input
            value={value}
            type="text"
            id="url-input"
            className="my-input"
            placeholder="https://www.google.com"
            onChange={this.onChange}
          />
          <Button waves="light">Short It!</Button>
        </div>
      </div>
    );
  }
}

// const style = {
//     input: {
//        border: "1px solid white",
//        backgroundColor: 'white',
//        boxShadow: '-4px 6px 5px -2px black'
//     }
// }

export default UrlInput;
