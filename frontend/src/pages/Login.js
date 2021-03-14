import React from "react";

import LoginForm from "../components/Login/LoginForm";
import { PageContainer, Header } from "./Pages.styles";
function Login() {
  return (
    <PageContainer>
      <Header>Login</Header>
      <LoginForm />
    </PageContainer>
  );
}

export default Login;
