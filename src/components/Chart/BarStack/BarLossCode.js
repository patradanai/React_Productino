import React from "react";
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

const BarLossCode = props => {
  return (
    <BarChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
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
  );
};

export default BarLossCode;
