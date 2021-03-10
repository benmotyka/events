import React from "react";

import {
  NavbarContainer,
  NavbarWrapper,
  PageName,
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
              <PageName>Events</PageName>
              <Items>
                {!context.token && (
                  <Item>
                    <Link to="/login">Login</Link>
                  </Item>
                )}
                <Item>
                  <Link to="/events">Events</Link>
                </Item>
                {context.token && (
                  <Item>
                    <Link to="/bookings">Bookings</Link>
                  </Item>
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
