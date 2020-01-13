import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      endpoint: "http://localhost:4001"
    };
  }

  componentDidMount() {
    this.response();
  }

  response = () => {
    const { endpoint, message } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("new-message", data => {
      console.log(data);
    });
  };

  render() {
    return (
      <Container>
        <h1>Live Monitor</h1>
      </Container>
    );
  }
}

export default Monitor;
