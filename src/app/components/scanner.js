"use client"
import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";

class Scanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: "No result",
      response: ""
    };

    this.handleError = this.handleError.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan = (data) => {
    if (data) {
      this.setState({ result: data });
      // Call api to validate the code and if it's valid, complete the quest
      fetch(`/api?code=${this.state.result}&id=${this.props.user?.id}`, {
        method: "POST"
      }).then((response) => {
        if(response.status === 200) {
          this.setState({ response: "Quest completed!" });
          this.props.onQuestCompleted();
        } else {
            this.setState({ response: "The quest is already completed or the code is invalid." });
        }
      });
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
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default Scanner;
