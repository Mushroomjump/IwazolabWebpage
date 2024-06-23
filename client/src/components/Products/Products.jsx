import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/user";
import test_img from "./test.png";
import learn_img from "./learn.png";
import question_img from "./question.png";

const ProductCard = ({ image, heading, paragraph, handleLearnMore }) => {
  return (
    <div className="">
      <img src={image} alt={heading} className="product_pic" />
      <h2 className="product_heading">{heading}</h2>
      <p className="">{paragraph}</p>
      <button onClick={handleLearnMore} className="product-btn">
        Learn More
      </button>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLearnMoreBot = () => {
    if (isAuthenticated) {
      navigate("/Chatbot");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMoreTax = () => {
    if (isAuthenticated) {
      navigate("/taxAcademy");
    } else {
      navigate("/login");
    }
  };

  const handleLearnMoreTest = () => {
    if (isAuthenticated) {
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
