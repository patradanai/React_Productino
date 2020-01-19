import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Statistic } from "semantic-ui-react";
import LiveTable from "../../components/Live/Monitor";
import { ws_connect, ws_disconnect } from "../../store/Actions";

class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Machine: [
        "NMPSC-401",
        "NMPSC-402",
        "NMPSC-403",
        "NMPSC-404",
        "NMPSC-405",
        "NMPSC-406",
        "NMPSC-407",
        "NMPSC-408",
        "NMPSC-409"
      ]
    };
  }

  componentDidMount() {
    this.props.ws_connect();
  }

  componentWillUnmount() {
    this.props.ws_disconnect();
  }

  Result = (Good, NG) => {
    const sum = parseInt(Good) + parseInt(NG);
    if (sum >= 0) {
      return sum;
    } else {
      return;
    }
  };

  Target = payload => {
    const target = parseInt(payload);
    if (target >= 0) {
      return Math.ceil(target * 5 * 0.63);
    } else {
      return;
    }
  };

  diff = (input, output) => {
    const diff = parseInt(output) - parseInt(input);
    if (!isNaN(diff)) {
      console.log(diff);
      return diff;
    } else {
      return;
    }
  };

  render() {
    const { Status } = this.props;
    const { Machine } = this.state;
    return (
      <Container>
        <br />
        <Statistic.Group widths="three">
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Faves</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>31,200</Statistic.Value>
            <Statistic.Label>Views</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Members</Statistic.Label>
          </Statistic>
        </Statistic.Group>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Machine</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Diff</Table.HeaderCell>
              <Table.HeaderCell>LossCode</Table.HeaderCell>
              <Table.HeaderCell>Elasp Time</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
              <Table.HeaderCell>Operator</Table.HeaderCell>
              <Table.HeaderCell>Maintance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Machine.map((data, index) =>
              Status[index].Machine ? (
                <LiveTable
                  key={index}
                  Name={Status[index].Machine}
                  Status={
                    Status[index].Status
                      ? "PRODUCTION"
                      : Status[index].Status === false
                      ? "STOP"
                      : ""
                  }
                  Target={this.Target(Status[index].Target)}
                  Result={this.Result(Status[index].Good, Status[index].NG)}
                  Diff={this.diff(
                    this.Target(Status[index].Target),
                    this.Result(Status[index].Good, Status[index].NG)
                  )}
                  LossCode={Status[index].LossCode}
                  Elasp={Status[index].ElspTime}
                  Details={Status[index].Details}
                  Operator={Status[index].Operator}
                  Maintanance={Status[index].Maintanance}
                />
              ) : (
                ""
              )
            )}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    Status: state.MQTT.msgPacket
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ws_connect: () => dispatch(ws_connect()),
    ws_disconnect: () => dispatch(ws_disconnect())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
