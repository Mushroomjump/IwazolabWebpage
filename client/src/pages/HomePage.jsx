import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Products from "../components/Products/Products";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <About/>
      <Products/>
      <Contact/>
      <Footer />
    </div>
  );
};

export default HomePage;
