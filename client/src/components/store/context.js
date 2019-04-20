import React, { Component } from "react";
import axios from "axios";

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      
      return { ...state, user: { token: action.payload.token } };
  }
};

export class Provider extends Component {
  state = {
    user: {
      token: "",
      data: []
    },
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };


  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
