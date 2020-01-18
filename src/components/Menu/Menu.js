import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import logo from "../../MyIcon.png";
import { Link } from "react-router-dom";

export default class MenuExampleStackable extends Component {
  render() {
    return (
      <Container>
        <Menu stackable>
          <Menu.Item>
            <img src={logo} alt="" />
          </Menu.Item>

          <Menu.Item name="Home">
            <Link to="/home">Home</Link>
          </Menu.Item>

          <Menu.Item name="Live Monitor">
            <Link to="/monitor">Live Monitor</Link>
          </Menu.Item>

          <Menu.Item name="Production">
            <Link to="/production">Production</Link>
          </Menu.Item>

          <Menu.Item name="BRT Management">
            <Link to="/brt">BRT Management</Link>
          </Menu.Item>

          <Menu.Item name="About">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </Container>
    );
  }
}
