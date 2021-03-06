import React, { Component } from "react";
import { Row, Col, Input, Icon, CardPanel, Button } from "react-materialize";
import axios from 'axios'
import { Consumer } from '../store/context'

class Login extends Component {
  state = {
    errors: {
      name: "",
      password: ""
    }
  };

  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }


  login = async (dispatch) => {
    const email = this.emailInputRef.state.value;
    const password = this.passwordInputRef.state.value;

    if (typeof password != "undefined" && password.length < 6) {
      this.setState({ errors: { password: "Password length must be atleast 6 characters!" } })
    }
    else {
      this.setState({ errors: { password: "" } })
    }

    if (typeof email != "undefined") {
      if (!validateEmail(email)) {

        this.setState({ errors: { email: "Invalid email address!" } })
      }
      else {
        this.setState({ errors: { email: "" } })
      }
    }
    else {
      this.setState({ errors: { email: "Invalid email address!" } })
    }

    if ((email !== "" || typeof email !== "undefined") && (password !== "" || typeof password !== "undefined")) {
      
      const res = await axios.post('/api/users/login', {
        'email': email,
        'password': password
      })
     
      
      dispatch({
        type: 'USER_LOGIN',
        payload: {
          token: res.data.data.token
        }
      })

      this.props.history.push('/')

    }

  }

  render() {
    const { errors } = this.state;
    return (
      <Consumer>
        {value => {

          const { dispatch } = value

          return (
            <CardPanel className="bg-primary" style={{ padding: "20px 5%" }}>
              <Row className="login">
                <h1 style={{ color: "white" }}>Login</h1>
                <Col s={12} m={12}>
                  <Input
                    s={12}
                    m={12}
                    name="email"
                    error={errors.email}
                    className="error"
                    label="Email"

                    ref={ref => this.emailInputRef = ref}
                  >
                    <Icon>account_circle</Icon>
                  </Input>

                  <Input
                    s={12}
                    m={12}
                    name="password"
                    error={errors.password}
                    label="Password"

                    type="password"
                    ref={ref => this.passwordInputRef = ref}
                  >
                    <Icon>lock</Icon>
                  </Input>
                  <Button onClick={this.login.bind(this, dispatch)} style={{ marginTop: "20px" }} waves="yellow">
                    Login
                </Button>
                </Col>
              </Row>
            </CardPanel>
          )
        }}

      </Consumer>

    );
  }
}

function validateEmail(sEmail) {
  const reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/

  if (sEmail === "") return false;

  return reEmail.test(sEmail);
}

function isEmpty(obj) {
  if (obj == null) return true;
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export default Login;
