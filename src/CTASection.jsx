import BackgroundIMG from './images/image.png'
import React from 'react';
import styled from 'styled-components';

const CtaSection = () => {
  return (
    <StyledWrapper>
      <img src={BackgroundIMG} className='BackgroundIMG' alt="background" />
      <div className="CtaSection">
        <div className="CtaSection-details">
          <p className="text-title">Call to Action</p>
          <p>Whether you're here to learn, teach, or support someone using Indian Sign Language, you've come to the right place.
          </p>
          <p >Let’s bridge the gap—one sign at a time.
          </p>
          <p>Start your journey toward connection, understanding, and empowerment today.</p>
        </div>
        <button className="CtaSection-button">Start Learning</button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: 'Frank Ruhl Libre', serif;

  .BackgroundIMG {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .CtaSection {
    width: 700px;
    height: 300px;
    border-radius: 25px;
    background: hsl(162, 15.90%, 32.20%);
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    color: #e1d1b5;
  }

  .CtaSection-details {
    color: rgb(225, 209, 181);
    height: 100%;
    gap: .5em;
    display: grid;
    place-content: center;
  }

  .CtaSection-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 2rem;
    border: none;
    background-color: rgb(225, 209, 181);
    color: #425c55;
    font-size: 1rem;
    padding: .5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
    height: 50px;
    font-family: 'Frank Ruhl Libre', serif;
  }

  .text-title {
    font-size: 2em;
    font-weight: bold;
    color: rgb(225, 209, 181);
  }

  .CtaSection:hover {
    border-color: #e5d8c0;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .CtaSection:hover .CtaSection-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;


export default CtaSection;
