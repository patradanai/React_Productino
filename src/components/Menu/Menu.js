import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import logo from "../../MyIcon.png";

export default class MenuExampleStackable extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src={logo} />
        </Menu.Item>

        <Menu.Item name="Monitoring">Monitoring</Menu.Item>

        <Menu.Item name="Production">Production</Menu.Item>

        <Menu.Item name="BRT Management">BRT Management</Menu.Item>
      </Menu>
    );
  }
}
