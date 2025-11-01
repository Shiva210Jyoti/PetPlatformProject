import React from 'react';
import HomeDarkCardLeftPic from "./images/LEFT.png";
import HomeDarkCardRightPic from "./images/cats.png";


const CardBelowHome = () => {
  
  return (
    <div className='dark-grey-container'>
      <div className='left-pic'><img src={HomeDarkCardLeftPic} alt="Dog with toy"/></div>
      <div className='left-para'><p><p className='adopted-pets-num'></p> Adopt a Pet,<br/>Gain a Lifelong Friend.</p></div>
      <div className='right-pic'><img src={HomeDarkCardRightPic} alt="Dog pic" /></div>
      <div className='right-para'><p className='we-do'>WHAT WE DO?</p>With a focus on matching the right pet with the right family, Pet's Paradise makes it easy to adopt love and foster happiness.</div>
    </div>
  )
}

export default CardBelowHome;