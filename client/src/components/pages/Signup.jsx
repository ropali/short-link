import React, { Component } from "react";
import { Row, Col, Input, Icon, CardPanel, Button } from "react-materialize";
import axios from 'axios'

class Signup extends Component {
  state = {
    errors: {
      name: "",
      password: "",
      confirm_password: ""
    }
  };

  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.confirmPasswordInputRef = React.createRef();
    this.nameInputRef = React.createRef();
  }

  signup = () => {
    const name = this.nameInputRef.state.value;
    const email = this.emailInputRef.state.value;
    const password = this.passwordInputRef.state.value;
    const confirm_password = this.confirmPasswordInputRef.state.value

    // TODO : validate fields before submit

    axios.post('/api/users/signup', {
      name,
      email,
      password,
      confirm_password
    })
    .then( res => {
      console.log(res.data);
      
    })
    .catch(err => {
      console.log(err)
    })
  };

  render() {
    const { errors } = this.state;
    return (
      <CardPanel className="bg-primary signup" style={{ padding: "20px 5%" }}>
        <Row>
          <h1 style={{ color: "white" }}>SignUp</h1>
          <Col s={12} m={12} xl={12}>
            <Input
              m={6}
              name="name"
              error={errors.name}
              className="error"
              label="Name"
              
              ref={ref => (this.nameInputRef = ref)}
            >
              <Icon>account_circle</Icon>
            </Input>
            <Input
              m={6}
              name="email"
              error={errors.email}
              className="error"
              label="Email"
              validate
              ref={ref => (this.emailInputRef = ref)}
            >
              <Icon>email</Icon>
            </Input>
            
            
            
          </Col>
          <Col s={12} m={12} xl={12}>
          <Input
              m={6}
              name="password"
              error={errors.password}
              label="Password"
              validate
              type="password"
              ref={ref => (this.passwordInputRef = ref)}
            >
              <Icon>lock</Icon>
            </Input>
            <Input
              m={6}
              name="confirm_password"
              error={errors.confirm_password}
              label="Confirm Password"
              validate
              type="password"
              ref={ref => (this.confirmPasswordInputRef = ref)}
            >
              <Icon>lock</Icon>
            </Input>
          </Col>

          <Button
              onClick={this.signup}
              style={{ marginTop: "20px" }}
              waves="yellow"
            >
              Signup
            </Button>
        </Row>
      </CardPanel>
    );
  }
}

function validateEmail(sEmail) {
    const reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
  
    if (sEmail !== "") return false;
  
    if(!sEmail.match(reEmail)) {
      return false;
    }
    return true;
  }

export default Signup;
