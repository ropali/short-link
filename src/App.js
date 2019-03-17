import React, { Component } from "react";

import NavBar from "./components/layouts/NavBar";
import UrlShortWidget from "./components/UrlShortWidget";
import CustomerFooter from './components/layouts/CustomFooter'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <UrlShortWidget />
        </div>
        <CustomerFooter/>
      </React.Fragment>
    );
  }
}

export default App;
