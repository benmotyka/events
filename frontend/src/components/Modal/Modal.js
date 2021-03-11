import React from "react";

import { Container, Header, Content, Action, Button } from "./Modal.styles";

function Modal(props) {
  return (
    <Container>
      <Header>{props.title}</Header>
      <Content>{props.children}</Content>
      <Action>
        {props.cancel && <Button onClick={props.onCancel}>Cancel</Button>}
        {props.confirm && <Button onClick={props.onConfirm}>Confirm</Button>}
      </Action>
    </Container>
  );
}

export default Modal;
