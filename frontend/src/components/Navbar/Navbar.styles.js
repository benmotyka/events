import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { colors } from "../../common/colors";
import { SiEventbrite } from "react-icons/si";

export const NavbarContainer = styled.div`
  background: ${({ scrollNav }) => (scrollNav ? colors.white : "transparent")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin-top: -80px;
  position: sticky;
  height: 80px;
  z-index: 100;
  transition: all 0.4s ease-in-out;
  top: 0;
`;
export const NavbarWrapper = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 2rem;
  max-width: 1000px;
  width: 100%;
  align-items: center;
`;
export const Logo = styled(SiEventbrite)`
  font-size: 25px;
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
  font-size: 20px;

  color: ${colors.black};
  text-decoration: none;
  &.${activeClassName} {
    color: ${colors.purple};
  }
`;
export const Item = styled.li`
  cursor: pointer;
  list-style: none;
`;
