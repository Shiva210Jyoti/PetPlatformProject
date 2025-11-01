import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <section className="adoption-intro">
  <h1 className="adoption-heading">Every Paw Deserves a Home 🐾</h1>
<p className="adoption-subtext">
  When you adopt a pet, you're not just getting a companion — you're giving love, shelter, and a second chance to a soul who truly needs it.
</p>

<div className="stories-container">
  <Card
    title="Saved by Love"
    description="Max, once abandoned on the streets, now spends his days chasing butterflies and snuggling with his new family. Once frightened and alone, he now thrives in a home filled with warmth, toys, and unconditional love. His transformation is a beautiful reminder of the impact a second chance can have on an animal’s life."
  />
  <Card
    title="The Right Match"
    description="Finding your perfect pet isn't just about looks — it's about heart. Whether you're drawn to a playful pup, a calm older cat, or a spirited rescue, adoption allows you to connect with a pet who complements your personality and lifestyle. It’s a decision that creates a lasting bond rooted in mutual trust and affection."
  />
  <Card
    title="More Than a Pet"
    description="Adopted animals often become more than pets — they become healers, protectors, and family. Their presence offers comfort in tough times and joy in the little moments. When you adopt, you gain a loyal friend who gives back more love than you ever thought possible. It's not just rescue — it's a life enriched on both sides."
  />
</div>

</section>

  )
}

export default PlanningToAdoptAPet;