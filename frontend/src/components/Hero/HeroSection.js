import React from "react";

import {
  HeroContainer,
  HeroSectionContainer,
  HeroSectionWrapper,
} from "./HeroSection.styles";
const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroSectionContainer marginBottom>
        <HeroSectionWrapper
          borderLeft
          backgroundImg="background2.jpg"
        ></HeroSectionWrapper>
      </HeroSectionContainer>
      <HeroSectionContainer marginBottom>
        <HeroSectionWrapper borderRight></HeroSectionWrapper>
      </HeroSectionContainer>
      <HeroSectionContainer>
        <HeroSectionWrapper></HeroSectionWrapper>
      </HeroSectionContainer>
    </HeroContainer>
  );
};

export default HeroSection;
