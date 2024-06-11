// About.jsx
import React from "react";
import About_pic from "./money1.jpg";
const About = () => {
  return (
    <div className="about-container">
      <section className="about-image">
        <img
          src={About_pic}
          alt="About Us"
          style={{ height: "100%", width: "40vw" }}
        />
      </section>
      <section className="about-text">
        <h2>About Us</h2>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium
          urna eu metus ultrices, id accumsan ipsum ultricies. Vivamus hendrerit
          risus in sapien ultrices, sit amet lacinia libero accumsan.
        </p>
        <p>
          Proin sodales luctus orci vel placerat. Nullam id tellus nisl. Integer
          consectetur justo a mauris accumsan, eget tempor turpis vehicula.
          Morbi quis turpis eget arcu efficitur hendrerit. In nec tincidunt
          risus. Suspendisse fringilla diam quis ante feugiat rutrum.
        </p>
      </section>
    </div>
  );
};

export default About;
