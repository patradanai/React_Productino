import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import socketIOClient from "socket.io-client";

const socketio = socketIOClient("http://localhost:4001");
class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  response = data => console.log(data);

  componentDidMount() {
    socketio.on("/Losscode/NPMSC-409", this.response);
  }

  componentWillUnmount() {
    socketio.off("/Losscode/NPMSC-409");
  }

  render() {
    return (
      <Container>
        <button onClick={this.send}>Click</button>
      </Container>
    );
  }
}

export default Monitor;
