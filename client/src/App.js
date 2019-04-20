import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/layouts/NavBar";
import UrlShortWidget from "./components/UrlShortWidget";
import About from "./components/pages/About"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import CustomFooter from "./components/layouts/CustomFooter";
import Dashboard from './components/pages/Dashboard'

import { Provider } from './components/store/context'

class App extends Component {

  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={UrlShortWidget} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/about" component={About} />
              </Switch>
            </div>
            {/* <CustomFooter /> */}
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
