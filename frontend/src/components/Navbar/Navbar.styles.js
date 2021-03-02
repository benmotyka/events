import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavbarContainer = styled.div`
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: sticky;
`;
export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
`;
export const PageName = styled.h2`
  font-size: 20px;
`;
export const Items = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const activeClassName = "nav-item-active";

export const Link = styled(NavLink).attrs({ activeClassName })`
  padding: 0 1rem;
  &.${activeClassName} {
    color: red;
  }
`;
export const Item = styled.li``;
