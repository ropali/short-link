import React, { Component } from "react";

import NavBar from "./components/NavBar";
import UrlShortWidget from "./components/UrlShortWidget";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <UrlShortWidget />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
