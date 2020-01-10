import React from "react";
import logo from "../../MyIcon.png";
import { Container, Divider, Image, List } from "semantic-ui-react";

const Footer = () => (
  <div>
    <Container textAlign="center">
      <Divider inverted section />
      <Image centered size="mini" src={logo} />
      <List horizontal inverted divided link size="small">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </div>
);

export default Footer;
