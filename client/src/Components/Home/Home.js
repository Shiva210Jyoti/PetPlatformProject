import React from "react";
import HomeLandingContainer from "./HomeLandingContainer";
import CardBelowHome from "./CardBelowHome";
import PlanningToAdoptAPet from "./PlanningToAdoptAPet";
import PetCarousel from '../PetCarousel/PetCarousel';

const Home = (props) => {
  
  return (
    <>
      <HomeLandingContainer description={props.description} />
      <PetCarousel />
      <CardBelowHome />
      <PlanningToAdoptAPet />
    </>
  );
};

export default Home;
