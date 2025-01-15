import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-container">
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          At <strong>RentHut</strong>,  we aim to simplify the process of finding the perfect rental home. Whether you’re 
          searching for a short-term getaway or a long-term residence, we bring you a wide range of options that are safe, 
          comfortable, and conveniently located. Our platform empowers users to explore listings, make secure bookings,
           and enjoy a seamless experience from start to finish.
        </p>
        <p>
        For homeowners, Rentora provides an easy-to-use interface to list, manage, and showcase properties to potential renters. 
        With our commitment to transparency, trust, and innovation, Rentora is more than just a rental platform—it’s where your next home begins.

        </p>
        <Link to="/" className="explore-link">
          <button className="explore-button">Discover</button>
        </Link>
      </section>
    </div>
  );
}

export default About;
