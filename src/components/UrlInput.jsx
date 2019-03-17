import React, { Component } from "react";
import { Button } from "react-materialize";
import Icon from "react-materialize/lib/Icon";
import { CopyToClipboard } from "react-copy-to-clipboard";

const initialState = {
  inputUrl: "",
  shorten: false,
  errors: {
    inputUrl: ""
  },
  copied: false
}

class UrlInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
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

  shortUrl = () => {
    const baseShortUrl = "https://short-link.com/";
    const url = this.state.inputUrl;
    if (url !== "" && this.isValidURL(url)) {
      this.setState({
        inputUrl: baseShortUrl + generateString(),
        shorten: true,
        errors: { inputUrl: "" }
      });
      
    } else if (!this.isValidURL(url) && url !== "") {
      this.setState({ errors: { inputUrl: "Invalid URL!" } });
      
    }
  };

  onCopy = () => {
    this.setState({ copied: true })
    window.Materialize.toast('Copied to your clipboard!', 3000)
  }

  resetState = () => {
    this.setState(initialState)
  }

  isValidURL = url => {
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return re.test(url);
  };

  render() {
    const { inputUrl, errors, shorten } = this.state;
    return (
      <div className="Wrapper">
        <h3 className="Title">Short Your URLS Here!</h3>
        <div className="Input">
          <div>
            {errors.inputUrl != "" && (
              <label className="error" htmlFor="inputUrl">
                { errors.inputUrl }
              </label>
            )}
            <input
              name="inputUrl"
              value={inputUrl}
              type="text"
              id="url-input"
              className="my-input"
              placeholder="Ex. https://www.google.com"
              onChange={this.onChange}
              onClick={this.getClipboardData}
            />
          </div>
          {!shorten && (
            <Button onClick={this.shortUrl} waves="light">
              Short It!
            </Button>
          )}

          {shorten && (
            <React.Fragment>
              <CopyToClipboard
                text={this.state.inputUrl}
                onCopy={this.copyToClipboard}
              >
                <Button style={style.copyBtn} onClick={this.onCopy}>
                  <Icon>filter_none</Icon>
                  {/* Copy! */}
                </Button>
              </CopyToClipboard>
              <Button style={style.copyBtn} onClick={this.resetState} >
                <Icon>refresh</Icon>
              </Button>
            </React.Fragment>
          )}
        </div>
        
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
    marginLeft: 10
  },
  copyIcon: {
    marginTop: "4px"
  }
};

export default UrlInput;
