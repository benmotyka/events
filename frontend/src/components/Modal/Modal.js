import React from "react";

import { Container, Header, Content, Action } from "./Modal.styles";

import Button from "../Button/Button";

function Modal(props) {
  return (
    <Container>
      <Header>{props.title}</Header>
      <Content>{props.children}</Content>
      <Action>
        {props.cancel && <Button onClick={props.onCancel} text="Cancel" />}
        {props.confirm && (
          <Button onClick={props.onConfirm} text={props.onConfirmText} />
        )}
      </Action>
    </Container>
  );
}

export default Modal;
