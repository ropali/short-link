import React from "react";
import { 
    Row,
    Col,
    CardPanel
 } from 'react-materialize'

export default function About() {
  return (
    <div>
      <Row>
        <Col s={12} m={12}>
          <CardPanel style={{ color: 'white' }} className="bg-primary">
            <h3>About Short Link!</h3>
            <span>
              Short Link is a free and open source URL shortner built using MERN Stack.

            </span>
            <h3>How it works!</h3>
            <span>
              Simply speaking, a URL shortener is a tool that shortens long links and produces short ones containing several characters. It’s useful mainly for marketers who take care of social media or email marketing. Shorter links are easier to share than long, complex ones. What's more, if a link is too long and has too many strange characters, users may be afraid of clicking on it, cause they don't know what is hidden on the other side.
            </span>
            
          </CardPanel>
        </Col>
        
      </Row>
    </div>
  );
}
