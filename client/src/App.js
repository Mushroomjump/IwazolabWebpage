import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/layout/Footer";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import Products from "./components/Products/Products";
import Chatbot from "./components/Products/Chatbot";
import TaxAcademy from "./components/Products/TaxAcademy";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/taxacademy" element={<TaxAcademy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <About />
        <Products />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
