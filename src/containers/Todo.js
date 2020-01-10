import React, { Component } from "react";
import { Button, Confirm } from "semantic-ui-react";
import {
  getList,
  addList,
  updateList,
  deleteList
} from "../../src/axios/BrtList";
import List from "../../src/components/BRT/List";
import Modal from "../../src/components/Modal/Modal";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      id: "",
      result: [],
      isopenConfirm: false,
      isopenModal: false,
      field1: "",
      field2: "",
      field3: "",
      setField: []
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    getList().then(data => {
      this.setState({ result: [...data.recordset] }, () =>
        console.log(this.state.result)
      );
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.closeModal();
    this.setState(
      {
        setField: {
          block: this.state.field1,
          trouble: this.state.field2,
          cause: this.state.field3
        }
      },
      () => {
        addList(this.state.setField)
          .then(res => console.log(res))
          .then(() => this.getAll());
        console.log(this.state.setField);
      }
    );
  };

  onUpdate = event => {
    event.preventDefault();
    console.log("UPDATE");
  };

  onDelete = id => {
    deleteList(id)
      .then(data => console.log(data))
      .then(() => this.getAll());
  };

  openConfirm = (event, data) => {
    event.preventDefault();
    this.setState({ isopenConfirm: true });
    this.setState({ id: data });
  };

  onConfirm = () => {
    this.onDelete(this.state.id);
    this.closeConfirm();
  };

  closeConfirm = () => {
    this.setState({ isopenConfirm: false });
  };

  openModal = () => {
    this.setState({ isopenModal: true });
    this.setState({ result: [] });
    this.setState({ field1: "", field2: "", field3: "" });
  };

  closeModal = () => {
    this.setState({ isopenModal: false }, () => this.getAll());
  };

  onChangeCreate = event => {
    if (event.target.name === "Field1") {
      this.setState({ field1: event.target.value });
    }
    if (event.target.name === "Field2") {
      this.setState({ field2: event.target.value });
    }
    if (event.target.name === "Field3") {
      this.setState({ field3: event.target.value });
    }
  };

  onChangeEdit = (event, index) => {
    const updateChange = [...this.state.result];
    console.log(updateChange);
    const updateChangeElement = { ...updateChange[index] };
    console.log(updateChangeElement);
    if (event.target.name === "Field1") {
      updateChangeElement.Block = event.target.value;
    }
    if (event.target.name === "Field2") {
      updateChangeElement.Trouble = event.target.value;
    }
    if (event.target.name === "Field3") {
      updateChangeElement.Cause = event.target.value;
    }

    updateChange[index] = updateChangeElement;

    console.log(updateChange[index]);

    this.setState({ result: updateChange });
    console.log(this.state.result);
  };

  render() {
    const { result, field1, field2, field3 } = this.state;
    const { isopenModal, isopenConfirm } = this.state;
    return (
      <div>
        <div className="ui container">
          <h2 className="ui header">
            <br />
            BRT TABLE
            <div className="sub header">เกี่ยวกับ BRT เพิ่ม, แก้ไข, ลบ</div>
            <br />
          </h2>
          <hr />
          <Modal
            title="Create BRT"
            Field1={field1}
            Field2={field2}
            Field3={field3}
            change={this.onChangeCreate}
            submit={this.onSubmit}
            onOpen={this.openModal}
            onClose={this.closeModal}
            open={isopenModal}
          />
          <br />
          <br />
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
              {result.map((values, index) => (
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
                      change={e => this.onChangeEdit(e, index)}
                    ></Modal>
                    <button
                      key={index + "Delete"}
                      className="ui secondary button"
                      onClick={e => this.openConfirm(e, values.No)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Confirm
            open={isopenConfirm}
            onCancel={this.closeConfirm}
            onConfirm={this.onConfirm}
          />
        </div>
      </div>
    );
  }
}

export default Todo;
