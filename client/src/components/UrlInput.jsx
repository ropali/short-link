import React, { Component } from "react";
import { Button, Preloader } from "react-materialize";
import Icon from "react-materialize/lib/Icon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from 'axios'

// Setup axios porxy
// axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.baseURL = "https://shortlink-app.herokuapp.com/"

const initialState = {
  inputUrl: "",
  shorten: false,
  errors: {
    inputUrl: ""
  },
  copied: false,
  shorting: false
};

class UrlInput extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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
    const { inputUrl } = this.state

    if (inputUrl.length > 0) {
      this.setState({ shorting: true })

      axios.post('/api/short', {
        url: inputUrl
      })
      .then((response) => {
        console.log(response);
        const data = response.data
        if (data.success == true) {
          // Set the state
          this.setState({ 
            inputUrl: data.url,
            shorten: true,
            errors: { inputUrl: "" }
          })
        }

      })
      .catch(function (error) {
        console.log(error);
      });
      
    }
    

  };

  onCopy = () => {
    
    this.setState({ copied: true });
    window.Materialize.toast("Copied to your clipboard!", 3000);
  };

  resetState = () => {
    this.setState(initialState);
  };

  isValidURL = url => {
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    return re.test(url);
  };

  render() {
    const { inputUrl, errors, shorten, shorting } = this.state;
    return (
      <div className="Wrapper">
        <h3 className="Title">Short Your URLS Here!</h3>
        <div className="Input">
          <div>
            {errors.inputUrl != "" && (
              <label className="error" htmlFor="inputUrl">
                {errors.inputUrl}
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
          {!shorten &&
            (shorting ? (
              <Preloader flashing size="small" />
            ) : (
              <Button onClick={this.shortUrl} waves="light">
                Short It!
              </Button>
            ))}

          {shorten && (
            <React.Fragment>
              <CopyToClipboard
                text={this.state.inputUrl}
                onCopy={this.copyToClipboard}
              >
                <Button style={style.copyBtn} onClick={this.onCopy}>
                  <Icon>filter_none</Icon>
                </Button>
              </CopyToClipboard>
              <Button style={style.copyBtn} onClick={this.resetState}>
                <Icon>refresh</Icon>
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
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
