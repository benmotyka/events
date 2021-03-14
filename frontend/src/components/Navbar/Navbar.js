import React from "react";

import {
  NavbarContainer,
  NavbarWrapper,
  Logo,
  Items,
  Link,
  Item,
} from "./Navbar.styles";

import AuthContext from "../../context/auth-context";

const Navbar = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <NavbarContainer>
            <NavbarWrapper>
              <Link to="/home">
                {" "}
                <Logo />
              </Link>
              <Items>
                <Item>
                  <Link to="/events">Events</Link>
                </Item>
                {!context.token && (
                  <Item>
                    <Link to="/login">Login</Link>
                  </Item>
                )}
                {context.token && (
                  <>
                    <Item>
                      <Link to="/bookings">Bookings</Link>
                    </Item>
                    <Item onClick={context.logout}>
                      <Link to="/logout">Logout</Link>
                    </Item>
                  </>
                )}
              </Items>
            </NavbarWrapper>
          </NavbarContainer>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
