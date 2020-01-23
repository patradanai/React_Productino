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
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="phase_1" stackId="a" fill="#8884d8" />
      <Bar dataKey="phase_2" stackId="a" fill="#0088FE" />
      <Bar dataKey="phase_3" stackId="a" fill="#00C49F" />
      <Bar dataKey="phase_4" stackId="a" fill="#FFBB28" />
      <Bar dataKey="phase_5" stackId="a" fill="#FF8042" />
      <Bar dataKey="phase_6" stackId="a" fill="#ff9933" />
      <Bar dataKey="phase_7" stackId="a" fill="#669900" />
      <Bar dataKey="phase_8" stackId="a" fill="#4d4dff" />
    </BarChart>
  );
};

export default BarLossCode;
