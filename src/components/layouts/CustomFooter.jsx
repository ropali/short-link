import React, { Component } from "react";
import { Footer } from "react-materialize";
import Icon from "react-materialize/lib/Icon"

const CustomerFooter = props => {
  return (
    <Footer
      id="footer"
      className="bg-primary"
      copyrights={  
          <React.Fragment>
              <span style={styles.span}>Made With</span> <span style={{ position: "absolute", top:'54px', marginLeft:5 }}><Icon >favorite</Icon></span> 
              <span style={{marginLeft:'35px'}}>By Ropali</span>
              <span style={{marginLeft:'35px', float:'right',fontWeight:'bolder'}}> 
               <a style={{color:'#D7D9DD'}} target="_blank" href="https://github.com/ropali/short-link">Github</a> 
              </span>
          </React.Fragment>
        }
      
    />
  );
};

const styles = {
    span: {
        fontSize: 'larger'
    }
}

export default CustomerFooter;
