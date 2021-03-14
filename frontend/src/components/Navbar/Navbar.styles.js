import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "../../common/colors";
import { SiEventbrite } from "react-icons/si";

export const NavbarContainer = styled.div`
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: sticky;
  background-color: ${colors.grey};
`;
export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1000px;
  width: 100%;
  align-items: center;
`;
export const Logo = styled(SiEventbrite)`
  font-size: 20px;
`;
export const Items = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const activeClassName = "nav-item-active";

export const Link = styled(NavLink).attrs({ activeClassName })`
  padding: 8px 15px;
  margin: 0 1rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  background-color: ${colors.black};
  text-decoration: none;
  &.${activeClassName} {
    background-color: ${colors.yellow};
    color: ${colors.black};
  }
`;
export const Item = styled.li`
  cursor: pointer;
`;
