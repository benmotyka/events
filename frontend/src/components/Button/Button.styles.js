import styled from "styled-components";
import { colors } from "../../common/colors";

export const Btn = styled.button`
  margin: 0 15px;
  border-radius: 15px;
  outline: none;
  border: none;
  background-color: ${colors.yellow};
  transition: 0.2s all ease-in-out;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: ${colors.white};
  }
`;
