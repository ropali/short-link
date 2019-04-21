import React, { Component } from "react";

import Icon from "react-materialize/lib/Icon"

const CustomerFooter = props => {
  return (

    <div class="footer bg-primary">
      <p><span style={styles.span}>Made With</span> <span ><Icon >favorite</Icon></span> <span style={styles.span}>By Ropali</span></p>
    </div>
  );
};

const styles = {
  span: {
    fontSize: 'larger'
  }
}

export default CustomerFooter;
