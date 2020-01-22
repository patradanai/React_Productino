import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Statistic, Header } from "semantic-ui-react";
import LiveTable from "../../components/Live/Monitor";
import { ws_connect, ws_disconnect, ws_onStatus } from "../../store/Actions";

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
      ],
      Target: 0,
      Output: 0,
      Ratio: 0,
      diff: 0
    };
  }

  Result = (Good, NG) => {
    const sum = parseInt(Good) + parseInt(NG);
    if (sum >= 0) {
      return sum;
    } else {
      return 0;
    }
  };

  Target = payload => {
    const target = parseInt(payload);
    if (target >= 0) {
      return Math.ceil(target * 5 * 0.63);
    } else {
      return 0;
    }
  };

  diff = (input, output) => {
    const diff = parseInt(output) - parseInt(input);
    if (!isNaN(diff)) {
      return diff;
    } else {
      return 0;
    }
  };

  componentDidMount() {
    // Connect to MQTT
    this.props.ws_connect();

    // Subscribe Topic
    this.props.ws_Status();

    setInterval(() => {
      let count = 0;
      let Result = 0;
      let ratio = 0;
      let diff = 0;
      for (let i = 0; i < this.state.Machine.length; i++) {
        count += this.Target(this.props.Status[i].Target);
        Result += this.Result(
          this.props.Status[i].Good,
          this.props.Status[i].NG
        );
      }
      ratio = Math.round((Result / count) * 100);
      diff = Result - count;
      this.setState({ Target: count });
      this.setState({ Ratio: ratio });
      this.setState({ Output: Result });
      this.setState({ Diff: diff });
    }, 1000);
  }

  componentWillUnmount() {
    this.props.ws_disconnect();
  }

  render() {
    const { Status } = this.props;
    const { Machine } = this.state;
    return (
      <React.Fragment>
        <Container>
          <br />
          <Header as="h2" icon="plug" content="Live Production" />
          <br />
          <Statistic.Group widths="four">
            <Statistic color="green">
              <Statistic.Value>{this.state.Target}</Statistic.Value>
              <Statistic.Label>Target</Statistic.Label>
            </Statistic>
            <Statistic color="yellow">
              <Statistic.Value>{this.state.Output}</Statistic.Value>
              <Statistic.Label>Production</Statistic.Label>
            </Statistic>
            <Statistic color="red">
              <Statistic.Value>{this.state.Diff}</Statistic.Value>
              <Statistic.Label>Diff</Statistic.Label>
            </Statistic>
            <Statistic color="purple">
              <Statistic.Value>
                {this.state.Ratio ? this.state.Ratio : 0}%
              </Statistic.Value>
              <Statistic.Label>Achievement Ratio</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Machine</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Target</Table.HeaderCell>
                <Table.HeaderCell>Result</Table.HeaderCell>
                <Table.HeaderCell>Good</Table.HeaderCell>
                <Table.HeaderCell>NG</Table.HeaderCell>
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
                        : !Status[index].Status
                        ? "STOP"
                        : ""
                    }
                    Target={this.Target(Status[index].Target)}
                    Result={this.Result(Status[index].Good, Status[index].NG)}
                    Good={Status[index].Good}
                    NG={Status[index].NG}
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
                ) : null
              )}
            </Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    Status: state.MQTT.msgPacket,
    Connected: state.MQTT.connected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ws_connect: () => dispatch(ws_connect()),
    ws_disconnect: () => dispatch(ws_disconnect()),
    ws_Status: () => dispatch(ws_onStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
