import React, { Component } from "react";

class Snackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show: this.props.show,
        text: this.props.text
    };
  }

  componentDidMount() {
    if (this.state.show === true) {
        // After 3 seconds, hide it
        setTimeout(function() {
         this.toggleSnackbar()
        }, 3000);
      }
  }

  toggleSnackbar = () => {
      console.log('snackbar called...');
      
      this.setState({ show: !this.state.show });
  }

  render() {
    const { text, show } = this.props;
    return (
      <div className={show === true ? "show" : ""} id="snackbar">
        {text}
      </div>
    );
  }
}


export default Snackbar;
