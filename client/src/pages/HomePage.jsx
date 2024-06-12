import React from "react";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Products />
      <Contact />
    </div>
  );
};

export default HomePage;
