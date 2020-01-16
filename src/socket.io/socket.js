import socketIOClient from "socket.io-client";
import React, { Component } from "react";

// defining the context with empty Data object

export const SocketContext = React.createContext({ data: {} });

// defining a useWebsocket hook for functional components
export const useWebsocket = () => React.useContext(SocketContext);

class Socket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.socket = socketIOClient("http://localhost:4001");
  }

  componentWillUnmount() {
    this.socket.off("/LossCode");
    // try {
    //   // this.socket !== null && this.socket.disconnect();
    //   this.socket.off("/LossCode");
    // } catch (e) {}
  }

  componentDidMount() {
    this.socket.on("/LossCode", payload => {
      this.setState({ data: payload });
      //this.socket.disconnect();
    });
  }

  render() {
    return (
      <SocketContext.Provider value={{ data: this.state.data }}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default Socket;
