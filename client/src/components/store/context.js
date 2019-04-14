import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      const { email, password } = action.payload;


    default:
      break;
  }
};

export class Provider extends Component {
  state = {
    user: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1Yzk4ZjgwY2VlMzQxZDIwYWM4NjAxZGMiLCJuYW1lIjoiUm9wYWxpIE11bnNoaSIsImVtYWlsIjoicm9wYWxpQGdtYWlsLmNvbSIsImlhdCI6MTU1NDEzMjgwOX0.W-I2bs2oWBaCWe7Er-vZeQKw3LiSQMk_AZD-ZeOIqec"
    },
    dispatch: action => {
      this.setState(state => reducer(state, action));
      console.log(this.state);
    }
  };


  loginUser = () => {
    
      axios
        .post("/api/users/login", {
          email: email,
          password: password
        })
        .then(response => {
          console.log(response.data.data);
          //   this.setState({ ...state, user: response.data.data });
          return { ...state, user: response.data.data };
        })
        .catch(err => {
          console.log(err);
          alert(err);
          return { ...state, user: {} };
        });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
