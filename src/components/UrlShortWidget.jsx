import React, { Component } from "react";
import {
    Row,
    Col,
    CardPanel
 } from 'react-materialize'

class UrlShrotWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className="center-align">
        <Col s={12} m={12}>
          <CardPanel className="black-text">
            
          </CardPanel>
        </Col>
        
      </Row>
    );
  }
}

export default UrlShrotWidget;
