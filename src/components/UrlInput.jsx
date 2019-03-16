import React, { Component } from "react";
import { Button } from "react-materialize";
import Icon from "react-materialize/lib/Icon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from './Snackbar';

class UrlInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "",
      errors: {
        inputUrl: ""
      },
      copied: false
    };
  }

  onChange = e => {
    this.setState({ inputUrl: e.target.value });
  };

  getClipboardData = () => {
    navigator.clipboard.readText().then(clipText => {
      // console.log(clipText);
      if (this.isValidURL(clipText) && this.state.inputUrl == "") {
        this.setState({ inputUrl: clipText });
      }
    });
  };

  copyToClipboard = () => {};

  shortUrl = () => {
    const baseShortUrl = "https://short-link/";
    const url = this.state.inputUrl;
    if (url !== "") {
      this.setState({ inputUrl: baseShortUrl + generateString() });
    }
    
  };

  isValidURL = url => {
    var re = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return re.test(url);
  };

  render() {
    const { inputUrl, errors } = this.state;
    return (
      <div className="Wrapper">
        <h3 className="Title">Short Your URLS Here!</h3>
        <div className="Input">
          <div style={{ display: "flex" }}>
            <input
              name="inputUrl"
              value={inputUrl}
              type="text"
              id="url-input"
              className={errors.inputUrl == "" ? "my-input" : "error"}
              placeholder="Ex. https://www.google.com"
              onChange={this.onChange}
              onClick={this.getClipboardData}
            />
            <CopyToClipboard
              text={this.state.inputUrl}
              onCopy={() => this.setState({ copied: true })}
            >
              <Button style={style.copyBtn} onClick={this.copyToClipboard}>
                <Icon style={style.copyIcon}>filter_none</Icon>
              </Button>
            </CopyToClipboard>
          </div>
          <Button onClick={this.shortUrl} waves="light">
            Short It!
          </Button>
        </div>
        <Snackbar text="URL Copeied To Your Clipboard" show={ this.state.copied } />
      </div>

      
    );
  }
}

function generateString() {
  var length = 6,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const style = {
  copyBtn: {
    height: "48px",
    border: "1px solid #2BBBAD"
  },
  copyIcon: {
    marginTop: "4px"
  }
};

export default UrlInput;
