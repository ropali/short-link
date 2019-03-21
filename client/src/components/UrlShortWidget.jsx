import React from "react";
import { Row, Col, CardPanel } from "react-materialize";

import UrlInput from "./UrlInput";

const UrlShrotWidget = () => {
  return (
    <Row className="center-align">
      <Col s={12} m={12}>
        <CardPanel className="black-text bg-primary">
          <UrlInput />
        </CardPanel>
      </Col>
    </Row>
  );
};

export default UrlShrotWidget;
