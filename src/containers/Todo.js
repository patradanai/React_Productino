import React, { Component } from "react";
import { Confirm, Pagination } from "semantic-ui-react";
import { getList, addList, deleteList } from "../../src/axios/BrtList";
import Modal from "../../src/components/Modal/Modal";
import "../containers/Todo.css";

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
      setField: [],
      itemperPage: 10,
      page: 1,
      totalPages: "",
      items: []
    };
  }

  async componentDidMount() {
    this.getAll();
  }

  // Handler Get from axios
  getAll = async () => {
    const res = await getList();
    this.setState({ result: [...res.data.recordset] });
    this.setState({
      totalPages: this.state.result.length / this.state.itemperPage
    });

    this.setState({
      items: this.state.result.slice(
        (this.state.page - 1) * this.state.itemperPage,
        (this.state.page - 1) * this.state.itemperPage + this.state.itemperPage
      )
    });
  };

  // Handler Add from axios
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
      async () => {
        const res = await addList(this.state.setField);
        console.log(res);
      }
    );
  };

  // Handler Update from axios
  onUpdate = event => {
    event.preventDefault();
    console.log("UPDATE");
  };

  // Handler Delete from axios
  onDelete = async id => {
    await deleteList(id);
    await this.getAll();
  };

  // Comfirm Delete Modal
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

  // Handler open Modal Edit , Create
  openModal = () => {
    this.setState({ isopenModal: true });
    this.setState({ result: [] });
    this.setState({ field1: "", field2: "", field3: "" });
  };

  closeModal = () => {
    this.setState({ isopenModal: false }, () => this.getAll());
  };

  // Handler OnChangeCreate
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

  // Handler OnChangeEdit
  onChangeEdit = (event, index) => {
    const updateChange = [...this.state.items];
    const updateChangeElement = { ...updateChange[index] };
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

    this.setState({ items: updateChange });
  };

  // HandlerPagination
  onHandlerPage = (event, activePage) => {
    event.preventDefault();
    const data = [...this.state.result];
    this.setState({ page: activePage.activePage }, () => {
      this.setState({
        items: data.slice(
          (this.state.page - 1) * this.state.itemperPage,
          (this.state.page - 1) * this.state.itemperPage +
            this.state.itemperPage
        )
      });
    });
  };

  render() {
    const { items, field1, field2, field3 } = this.state;
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
          <div className="CreateButton">
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
          </div>
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
              {items.map((values, index) => (
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
          <div className="showEntries">
            Show 1 to {this.state.itemperPage} of {this.state.result.length}{" "}
            entries
          </div>
          <Pagination
            totalPages={Math.ceil(this.state.totalPages)}
            activePage={this.state.page}
            onPageChange={this.onHandlerPage}
          />
        </div>
      </div>
    );
  }
}

export default Todo;
