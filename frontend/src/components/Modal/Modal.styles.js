import styled from "styled-components";
import { colors } from "../../common/colors";

// export const Container, Header, Content, Action
export const Container = styled.div`
  margin: 0 auto;
  width: 50rem;
  max-width: 80%;
  background-color: ${colors.grey};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: fixed;
  top: 20vh;
  left: calc((100% - 50rem) / 2);
`;
export const Header = styled.h2`
  text-align: center;
  margin: 0;
  padding: 10px 0;
  color: ${colors.white};
  background-color: ${colors.black};
`;
export const Content = styled.div`
  padding: 2rem;
`;
export const Action = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
