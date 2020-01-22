const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const mqtt = require("mqtt");
const app = express();
const Port = process.env.PORT || 4001;

const MqttClient = mqtt.connect("mqtt://mtl-700-noa55");

const Label = [
  "Machine",
  "Input",
  "Output",
  "Operation",
  "SU",
  "WR3",
  "WR4",
  "WS3",
  "WS4",
  "BM",
  "RW",
  "ST",
  "SS",
  "WO",
  "OJ",
  "CL",
  "UC",
  "CM",
  "WP",
  "SU1",
  "MS",
  "WT",
  "PM",
  "NP",
  "Unknowns",
  "ShortStop"
];

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

MqttClient.on("connect", () => {
  console.log("COnnected MQTT");
  MqttClient.subscribe("/Gui_LossCode/#");
});

const server = app.listen(Port, () => {
  console.log(`SOCKET IO RUNNIN ON PORT : ${Port}`);
});

const io = socketIO.listen(server);

io.on("connection", client => {
  console.log("user connected");
  console.log(client.id);
  client.on("disconnect", () => {
    console.log("user disconnected");
    client.disconnect();
    console.log(client.id);
    setInterval(() => {
      io.emit("/Losscode", 1);
    }, 10000);
  });
  // setInterval(() => {
  //   io.sockets.emit("/Losscode", 1);
  // }, 10000);
  // client.on("new-message", message => {
  //   io.sockets.emit("new-message", "message");
  //   console.log(message);
  // });
  // MqttClient.on("message", (topic, message) => {
  //   const data = CvtData(topic, message);
  //   console.log(data);
  //   io.sockets.emit("/Losscode/NPMSC-409", data);
  // });
});

const CvtData = (topic, data) => {
  let msgSlice = data.toString().slice(1, -1);
  let packet = [];
  msgSlice = msgSlice.split(",");
  msgSlice.map((data, index) => {
    const obj = {};

    if (index === 1) {
      obj[Label[0]] = topic.slice(14, 24);
      packet.push(obj);
      //continue;
    }

    obj[Label[index + 1]] = data;
    packet.push(obj);
  });
  return packet;
};
