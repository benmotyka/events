import React from "react";

import {
  NavbarContainer,
  NavbarWrapper,
  PageName,
  Items,
  Link,
  Item,
} from "./Navbar.styles";

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarWrapper>
        <PageName>Events</PageName>
        <Items>
          <Item>
            <Link to="/login">Login</Link>
          </Item>
          <Item>
            <Link to="/events">Events</Link>
          </Item>
          <Item>
            <Link to="/bookings">Bookings</Link>
          </Item>
        </Items>
      </NavbarWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
