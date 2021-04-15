import React from "react";
import { PageContainer, Header } from "./Pages.styles";
import HeroSection from "../components/Hero/HeroSection";
import Navbar from "../components/Navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}

export default Home;
