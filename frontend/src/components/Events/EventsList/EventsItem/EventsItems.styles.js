import styled, { css } from "styled-components";
import { colors } from "../../../../common/colors";

export const ItemContainer = styled.li`
  font-size: 24px;
  width: 70%;
  margin: 10px 0;
  padding: 25px;
  background-color: ${colors.grey};
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
`;

export const ItemSection = styled.div`
  text-align: ${({ left }) => (left ? "left" : "right")};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemText = css`
  margin: 0;
`;

export const ItemPrice = styled.p`
  ${ItemText};
`;
export const ItemTitle = styled.p`
  ${ItemText};
`;
