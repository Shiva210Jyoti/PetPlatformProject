import React from "react";
import dog from "./images/dogs1.png";
import homepageDog from "./images/cat1.png";
import footPrint from "./images/footPrint.png";
import { Link } from "react-router-dom";

const HomeLandingContainer = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="home-container">
      <div className="homeContainer-left">
        <div>
          <p className="home-title">
            <div className="home-titlePlusPng">
            <p>Ready to</p><img src={homepageDog} alt="Dog sitting"/>
            </div>
            Adopt a
            <br />
            Pet ?
          </p>
          <p className="home-second-para">
            {props.description}
          </p>
        </div>
        <div className="adopt-btn">
          <Link to='./pets'><button className="Home-button" onClick={scrollToTop}><p>Adopt a Pet</p><img src={footPrint} alt="footprint" /></button></Link>
        </div>
      </div>
      <div className="homeContainer-right">
        <img src= {dog} alt='Girl holding a Dog'/>
      </div>
    </div>
  );
};

export default HomeLandingContainer;
