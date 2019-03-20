import React, { Component } from "react";
import { Row, Col, Input, Icon, CardPanel, Button } from "react-materialize";

class Login extends Component {
  state = {
    name:"",
    password: "",
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

  onChange = (ref) => {
    console.log(ref);
    
  }
  
  login = () => {
    console.log(this.emailInputRef.state.value);
    
  }

  render() {
    return (
      <CardPanel className="bg-primary" style={{ padding: "20px 5%" }}>
        <Row class="login">
          <h1 style={{ color: "white" }}>Login</h1>
          <Col s={12} m={12}>
            <Input
              s={12}
              m={12}
              name="email"
              error=""
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
              error=""
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

export default Login;
