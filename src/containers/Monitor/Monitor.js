import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import socketIOClient from "socket.io-client";
import { Bar } from "react-chartjs-2";

let socketio;
class Monitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
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
        datasets: [
          {
            label: "SU",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#D6E9C6" // green
          },
          {
            label: "WR3",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#FAEBCC" // yellow
          },
          {
            label: "WR4",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#EBCCD1" // yellow
          },
          {
            label: "WS3",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#000" // yellow
          },
          {
            label: "WS4",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(0, 255, 0, 0.1)'" // yellow
          },
          {
            label: "BM",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(100, 0, 255, 2)" // yellow
          },
          {
            label: "RW",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(0, 0, 1, 2)" // yellow
          },
          {
            label: "ST",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 10, 200, 2)" // yellow
          },
          {
            label: "SS",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(1, 10, 10, 2)" // yellow
          },
          {
            label: "WO",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(100, 50, 0, 2)" // yellow
          },
          {
            label: "OJ",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(1, 20, 30, 2)" // yellow
          },
          {
            label: "CL",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(100,100, 100, 2)" // yellow
          },
          {
            label: "UC",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(100, 150, 10, 2)" // yellow
          },
          {
            label: "CM",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(100, 100, 50, 2)" // yellow
          },
          {
            label: "WP",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(200, 200, 200, 2)" // yellow
          },
          {
            label: "SU1",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(120,200, 100, 2)" // yellow
          },
          {
            label: "MS",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 255, 100, 2)" // yellow
          },
          {
            label: "WT",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 0, 100, 0.1)" // yellow
          },
          {
            label: "PM",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 0, 255, 2)" // yellow
          },
          {
            label: "NP",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 0, 255, 0.5)" // yellow
          },
          {
            label: "Unknowns",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 100, 100, 0.2)" // yellow
          },
          {
            label: "ShortStop",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(255, 0, 255, 0.3)" // yellow
          }
        ]
      }
    };
  }

  response = data => {
    let barchart = this.chartReference.chartInstance;
    const updateChart = { ...this.state.chartData };
    this.state.chartData.labels.filter((label, index) => {
      if (data[0].Machine === label) {
        updateChart.datasets[0].data[index] = data[4].SU;
        updateChart.datasets[1].data[index] = data[5].WR3;
        updateChart.datasets[2].data[index] = data[6].WR4;
        updateChart.datasets[3].data[index] = data[7].WS3;
        updateChart.datasets[4].data[index] = data[8].WS4;
        updateChart.datasets[5].data[index] = data[9].BM;
        updateChart.datasets[6].data[index] = data[10].RW;
        updateChart.datasets[7].data[index] = data[11].ST;
        updateChart.datasets[8].data[index] = data[12].SS;
        updateChart.datasets[9].data[index] = data[13].WO;
        updateChart.datasets[10].data[index] = data[14].OJ;
        updateChart.datasets[11].data[index] = data[15].CL;
        updateChart.datasets[12].data[index] = data[16].UC;
        updateChart.datasets[13].data[index] = data[17].CM;
        updateChart.datasets[14].data[index] = data[18].WP;
        updateChart.datasets[15].data[index] = data[19].SU1;
        updateChart.datasets[16].data[index] = data[20].MS;
        updateChart.datasets[17].data[index] = data[21].WT;
        updateChart.datasets[18].data[index] = data[22].PM;
        updateChart.datasets[19].data[index] = data[23].NP;
        updateChart.datasets[20].data[index] = data[24].Unknowns;
        updateChart.datasets[21].data[index] = data[25].ShortStop;
      }
    });

    this.setState({ chartData: updateChart });
    barchart.update();
  };

  componentDidMount() {
    socketio = socketIOClient("http://localhost:4001");
    socketio.on("/Losscode", this.response);
  }

  componentWillUnmount() {
    socketio.off("/Losscode");
    socketio.disconnect();
  }

  render() {
    return (
      <Container>
        <Bar
          ref={reference => {
            this.chartReference = reference;
          }}
          data={this.state.chartData}
          options={{
            scales: {
              yAxes: [{ stacked: true }],
              xAxes: [{ stacked: true }]
            }
          }}
        />
      </Container>
    );
  }
}

export default Monitor;
