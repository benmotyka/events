import React, { useEffect, useState } from "react";

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
  const [scrollNav, setScrollNav] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);
  const changeNav = () => {
    if (window.scrollY >= 150) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <NavbarContainer scrollNav={scrollNav}>
            <NavbarWrapper>
              <Link to="/home">
                {" "}
                <Logo />
              </Link>
              <Items>
                <Item>
                  <Link to="/events">Events</Link>
                </Item>
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
              {!context.token && (
                <Item>
                  <Link to="/login">Login</Link>
                </Item>
              )}
            </NavbarWrapper>
          </NavbarContainer>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
