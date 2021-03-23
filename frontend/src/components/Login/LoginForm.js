import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import {
  LoginContainer,
  Input,
  Label,
  ButtonsContainer,
} from "./LoginForm.styles";

import Button from "../../components/Button/Button";

import AuthContext from "../../context/auth-context";

function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });

  const context = useContext(AuthContext);

  const set = (field) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [field]: value }));
    };
  };

  const sendRegisterForm = async () => {
    const requestBody = {
      query: `
      mutation Register($email: String!, $password: String!){
        createUser(userInput: {email: $email, password: $password }) {
          _id
          email
        }
      }     
      `,
      variables: {
        email: values.email,
        password: values.password,
      },
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
query Login($email: String!, $password: String!){ 
  login(email: $email, password: $password) {
    userId
    token
    tokenExpiration
  }
}  
      `,
      variables: {
        email: values.email,
        password: values.password,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody
      );
      const token = response.data.data.login.token;
      if (token) {
        context.login(
          token,
          response.data.data.login.userId,
          response.data.data.login.tokenExpiration
        );
      }
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
        <Button onClick={sendRegisterForm} text="Register" />
        <Button onClick={sendLoginForm} text="Login" />
      </ButtonsContainer>
    </LoginContainer>
  );
}

export default LoginForm;
