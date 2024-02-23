"use client"
import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";

class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "No result",
    };

    this.handleError = this.handleError.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan = (data) => {
    if (data) {
      console.info(data);
      this.setState({ result: data });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          facingMode={"environment"}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        {/* <p>{this.state.result}</p> */}
      </div>
    );
  }
}

export default Scanner;
