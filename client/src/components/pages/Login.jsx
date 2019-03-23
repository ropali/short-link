import React, { Component } from "react";
import { Row, Col, Input, Icon, CardPanel, Button } from "react-materialize";

class Login extends Component {
  state = {
    errors: {
        name: "",
        password: ""
    }
  };

  constructor(props){
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  
  login = () => {
    const email = this.emailInputRef.state.value;
    const password = this.passwordInputRef.state.value;
    console.log(email);
    
    if (typeof password != "undefined" && password.length < 6) {
      this.setState({ errors: { password: "Password length must be atleast 6 characters!" } })
    }

    if (typeof email != "undefined") {
      if (!validateEmail(email)) {
        this.setState({ errors: { email: "Invalid email address!" } })
      }
    }
    
    
  }

  render() {
    const { errors } = this.state;
    return (
     
      <CardPanel className="bg-primary" style={{ padding: "20px 5%" }}>
        <Row class="login">
          <h1 style={{ color: "white" }}>Login</h1>
          <Col s={12} m={12}>
            <Input
              s={12}
              m={12}
              name="email"
              error={errors.email}
              className="error"
              label="Email"
              validate
              ref={ref => this.emailInputRef = ref}
            >
              <Icon>account_circle</Icon>
            </Input>

            <Input
              s={12}
              m={12}
              name="password"
              error={ errors.password }
              label="Password"
              validate
              type="password"
              ref={ref => this.passwordInputRef = ref}
            >
              <Icon>lock</Icon>
            </Input>
            <Button onClick={ this.login } style={{ marginTop: "20px" }} waves="yellow">
              Login
            </Button>
          </Col>
        </Row>
      </CardPanel>
    );
  }
}

function validateEmail(sEmail) {
  const reEmail = new RegExp('^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$');

  if (sEmail !== "") return false;

  if(!sEmail.match(reEmail)) {
    return false;
  }
  return true;
}

export default Login;
