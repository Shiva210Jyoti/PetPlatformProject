import React from "react";
import adoptPet from "./images/adopt1.png";
import { Link } from "react-router-dom";

const AdoptSection = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="adopt-section">
      <h2>Adopt a Pet</h2>
      <img src={adoptPet} alt="Happy Pet" />

      <p>
  Welcome to our Pet Adoption Program! Giving a loving home to a pet not only changes their life — it brings endless joy, companionship, and unconditional love into yours.
</p>

<h3>Why Adopt a Pet?</h3>
<ul>
  <li>Give a second chance to a pet in need</li>
  <li>Gain a loyal friend and lifelong companion</li>
  <li>Make unforgettable memories together</li>
</ul>

<h3>How the Adoption Process Works</h3>
<ol>
  <li>Submit a simple adoption application</li>
  <li>Visit and connect with adoptable pets</li>
  <li>Complete adoption forms and welcome your new family member home</li>
</ol>

<h3>Your Commitment as a Pet Parent</h3>
<p>
  Bringing a pet home is a promise to care for their health and happiness. This means providing nutritious food, regular exercise, love, grooming, and routine veterinary care to keep your furry friend safe and healthy.
</p>

      <Link to="/pets">
        <button className="cta-button" onClick={scrollToTop}>Find Your Perfect Pet</button>
      </Link>
    </section>
  );
};

export default AdoptSection;
