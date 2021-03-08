import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  LoginContainer,
  Input,
  Button,
  Label,
  ButtonsContainer,
} from "./LoginForm.styles";

function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });

  const set = (field) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [field]: value }));
    };
  };

  const sendRegisterForm = async () => {
    const requestBody = {
      query: `
      mutation {
        createUser(userInput: {email: "${values.email}", password: "${values.password}" }) {
          _id
          email
        }
      }     
      `,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody
      );
      console.log(response.data);
      setValues({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendLoginForm = async () => {
    const requestBody = {
      query: `
query { 
  login(email: "${values.email}", password: "${values.password}") {
    userId
    token
    tokenExpiration
  }
}  
      `,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody
      );
      console.log(response.data);
      setValues({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <Label>email</Label>
      <Input type="email" value={values.email} onChange={set("email")} />
      <Label>password</Label>
      <Input
        type="password"
        value={values.password}
        onChange={set("password")}
      />
      <ButtonsContainer>
        <Button onClick={sendRegisterForm}>register</Button>
        <Button onClick={sendLoginForm}>login</Button>
      </ButtonsContainer>
    </LoginContainer>
  );
}

export default LoginForm;
