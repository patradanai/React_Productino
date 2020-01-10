import React from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

export const BrtContext = React.createContext({
  field1: "",
  field2: "",
  field3: ""
});

const ModalExampleCloseIcon = props => {
  const changeHandler = event => {
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
  return (
    <BrtContext.Provider value={{ field1: "", field2: "", field3: "" }}>
      <Modal
        trigger={
          <Button className="ui primary button" onClick={props.onOpen}>
            {props.title}
          </Button>
        }
        closeIcon
        open={props.open}
        onClose={props.onClose}
      >
        <Header icon="archive" content={props.title} />
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Block"
                name="Field1"
                placeholder="บล็อคเครื่องจักร"
                value={props.Field1}
                onChange={props.change}
              />
              <Form.Input
                fluid
                label="Trouble"
                name="Field2"
                placeholder="ปัญหาที่พบ"
                value={props.Field2}
                onChange={props.change}
              />
              <Form.Input
                fluid
                label="Cause"
                name="Field3"
                placeholder="สาเหตุปัญหา"
                value={props.Field3}
                onChange={props.change}
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={props.onClose}>
            <Icon name="remove" /> ยกเลิก
          </Button>
          <Button color="green" onClick={props.submit}>
            <Icon name="checkmark" /> ยืนยัน
          </Button>
        </Modal.Actions>
      </Modal>
    </BrtContext.Provider>
  );
};

export default ModalExampleCloseIcon;
