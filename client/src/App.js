import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/layouts/NavBar";
import UrlShortWidget from "./components/UrlShortWidget";
import About from "./components/pages/About"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import CustomFooter from "./components/layouts/CustomFooter";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <div className="container">
            <Route exact path="/" component={ UrlShortWidget } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/about" component={ About } />
          </div>
          <CustomFooter />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
