import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import test_img from "./test.png";
import learn_img from "./learn.png";
import question_img from "./question.png";

const ProductCard = ({ image, heading, paragraph, handleLearnMore }) => {
  return (
    <div className="">
      <img src={image} alt={heading} className="product_pic" />
      <h2 className="product_heading">{heading}</h2>
      <p className="">{paragraph}</p>
      <button onClick={handleLearnMore} className="">
        Learn More
      </button>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLearnMoreBot = () => {
    // Redirect to bot detail page
    navigate("/Chatbot");
  };

  const handleLearnMoreTax = () => {
    if (isLoggedIn) {
      // Redirect to tax detail page
      navigate("/taxAcademy");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMoreTest = () => {
    if (isLoggedIn) {
      // Redirect to test detail page
      navigate("/test-details");
    } else {
      navigate("/login");
    }
  };

  return (
    <section id="products" className="">
      <h2 className="products-t">Our Products</h2>
      <div className="products-container">
        <div className="product-1">
          <ProductCard
            image={question_img}
            heading="Ask your Questions"
            paragraph="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo rem iusto, veniam possimus sit aliquam accusantium. Dignissimos cupiditate ipsa est."
            handleLearnMore={handleLearnMoreBot}
          />
        </div>
        <div className="product-1">
          <ProductCard
            image={learn_img}
            heading="Learn about Taxes"
            paragraph="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo rem iusto, veniam possimus sit aliquam accusantium. Dignissimos cupiditate ipsa est."
            handleLearnMore={handleLearnMoreTax}
          />
        </div>
        <div className="product-1">
          <ProductCard
            image={test_img}
            heading="Test Your Knowledge"
            paragraph="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo rem iusto, veniam possimus sit aliquam accusantium. Dignissimos cupiditate ipsa est."
            handleLearnMore={handleLearnMoreTest}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
