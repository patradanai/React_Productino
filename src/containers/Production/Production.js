import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  ws_connect,
  ws_connected,
  ws_disconnect,
  ws_disconnected,
  ws_onProduction
} from "../../store/Actions";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Production = () => {
  const dispatch = useDispatch();
  const msgPacket = useSelector(state => state.MQTT.msgProduction);
  const connected = useSelector(state => state.MQTT.connected);
  const [packet, setPacket] = useState([]);
  const MachineName = [
    "C401",
    "C402",
    "C403",
    "C404",
    "C405",
    "C406",
    "C407",
    "C408",
    "C409"
  ];
  useEffect(() => {
    setTimeout(() => {
      dispatch(ws_connect());
      dispatch(ws_connected());
      dispatch(ws_onProduction());
    }, 2000);
    return () => {
      dispatch(ws_disconnect());
      dispatch(ws_disconnected());
    };
  }, []);
  useEffect(() => {
    const setTime = setInterval(() => {
      updateChart();
    }, 5000);
    return () => {
      clearInterval(setTime);
    };
  }, [msgPacket]);

  const updateChart = () => {
    console.log(packet);
    setPacket(packet => {
      return (
        { ...packet },
        MachineName.map((data, index) => {
          return {
            name: data,
            SU: msgPacket[index].SU,
            WS3: msgPacket[index].WS3,
            WS4: msgPacket[index].WS4,
            WR3: msgPacket[index].WR3,
            WR4: msgPacket[index].WR4,
            BM: msgPacket[index].BM,
            RW: msgPacket[index].RW,
            ST: msgPacket[index].ST,
            SS: msgPacket[index].SS,
            WO: msgPacket[index].WO,
            OJ: msgPacket[index].OJ,
            CL: msgPacket[index].CL,
            UC: msgPacket[index].UC,
            CM: msgPacket[index].CM,
            WP: msgPacket[index].WP,
            MS: msgPacket[index].MS,
            PM: msgPacket[index].PM,
            WT: msgPacket[index].WT,
            NP: msgPacket[index].NP,
            Unknown: msgPacket[index].Unknown
          };
        })
      );
    });
  };

  return (
    <Container>
      <h1>Production</h1>
      <BarChart
        width={500}
        height={300}
        data={packet}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="SU" stackId="a" fill="#8884d8" />
        <Bar dataKey="WS3" stackId="a" fill="#0088FE" />
        <Bar dataKey="WS4" stackId="a" fill="#00C49F" />
        <Bar dataKey="WR3" stackId="a" fill="#FFBB28" />
        <Bar dataKey="WR4" stackId="a" fill="#FF8042" />
        <Bar dataKey="BM" stackId="a" fill="#ff9933" />
        <Bar dataKey="RW" stackId="a" fill="#669900" />
        <Bar dataKey="ST" stackId="a" fill="#4d4dff" />
        <Bar dataKey="SS" stackId="a" fill="#ffff66" />
        <Bar dataKey="WO" stackId="a" fill="#d966ff" />
        <Bar dataKey="OJ" stackId="a" fill="#ffcc66" />
        <Bar dataKey="CL" stackId="a" fill="#6600ff" />
        <Bar dataKey="UC" stackId="a" fill="#b300b3" />
        <Bar dataKey="CM" stackId="a" fill="#cc0066" />
        <Bar dataKey="WP" stackId="a" fill="#990000" />
        <Bar dataKey="SU1" stackId="a" fill="#66ffd9" />
        <Bar dataKey="MS" stackId="a" fill="#6666ff" />
        <Bar dataKey="PM" stackId="a" fill="#66ffd9" />
        <Bar dataKey="WT" stackId="a" fill="#ff66d9" />
        <Bar dataKey="NP" stackId="a" fill="8c66ff" />
        <Bar dataKey="Unknown" stackId="a" fill="#ff8c66" />
        <Bar dataKey="ShortStop" stackId="a" fill="#82ca9d" />
      </BarChart>
    </Container>
  );
};

export default Production;
