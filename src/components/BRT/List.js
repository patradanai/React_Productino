import React from "react";
import Aux from "../../hoc/Auxilary";
import Modal from "../Modal/Modal";

const List = props => {
  const { values } = props;
  return (
    <Aux>
      <table className="ui striped table">
        <thead>
          <tr>
            <th>No</th>
            <th>Block</th>
            <th>Trouble</th>
            <th>Cause</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {values.map((values, index) => (
            <tr key={index}>
              <td key={index + "No"}>{values.No}</td>
              <td key={index + "Block"}>{values.Block}</td>
              <td key={index + "Trouble"}>{values.Trouble}</td>
              <td key={index + "Cause"}>{values.Cause}</td>
              <td key={index + "Actions"}>
                <Modal
                  title="Edit BRT"
                  Field1={values.Block}
                  Field2={values.Trouble}
                  Field3={values.Cause}
                ></Modal>
                <button
                  key={index + "Delete"}
                  className="ui secondary button"
                  onClick={e => props.deleteClick(e, values.No)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Aux>
  );
};

export default List;
