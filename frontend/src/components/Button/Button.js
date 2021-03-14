import React from "react";

import { Btn } from "./Button.styles";
function Button(props) {
  return <Btn onClick={props.onClick}>{props.text}</Btn>;
}

export default Button;
