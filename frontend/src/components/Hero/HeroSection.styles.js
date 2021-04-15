import styled, { css } from "styled-components";
import { colors } from "../../common/colors";

export const HeroContainer = styled.div``;
export const HeroSectionContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "200px" : "0")};
  position: relative;
  overflow: hidden;
`;

export const HeroSectionWrapper = styled.div`
  background-image: ${({ backgroundImg }) =>
    backgroundImg
      ? `url('./img/backgrounds/${backgroundImg}')`
      : "url('./img/backgrounds/defaultBackground.jpg')"};

  width: 100%;
  height: 100%;
  &:before {
    content: "";
    position: absolute;
    transform-origin: center center;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 150px solid white;
    border-left: ${({ borderLeft }) =>
      borderLeft ? "100vw solid transparent" : ""};
    border-right: ${({ borderRight }) =>
      borderRight ? "100vw solid transparent" : ""};
  }
`;
