import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = props => {
  return (
    <div>
      <Bar ref={props.reference} data={props.values} options={props.options} />
    </div>
  );
};

export default BarChart;
