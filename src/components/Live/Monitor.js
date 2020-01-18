import React from "react";
import { Table, Icon } from "semantic-ui-react";

const Live = props => {
  return (
    <Table.Row>
      <Table.Cell className="">{props.Name}</Table.Cell>
      <Table.Cell className="">{props.Status}</Table.Cell>
      <Table.Cell className="">{props.Target}</Table.Cell>
      <Table.Cell className="">{props.Result}</Table.Cell>
      <Table.Cell className="">{props.Diff}</Table.Cell>
      <Table.Cell className="">{props.LossCode}</Table.Cell>
      <Table.Cell className="">{props.Elasp}</Table.Cell>
      <Table.Cell className="">{props.Details}</Table.Cell>
      <Table.Cell className="">{props.Operator}</Table.Cell>
      <Table.Cell className="">{props.Target}</Table.Cell>
    </Table.Row>
  );
};

export default Live;
