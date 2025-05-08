import React from 'react';
import styled from 'styled-components';

const Card = ({ icon, title, description }) => {
  return (
    <StyledWrapper>
      <section className="card">
        {icon}
        <div className="card__content">
          <p className="card__title">{title}</p>
          <p className="card__description">{description}</p>
        </div>
      </section>
    </StyledWrapper>
  );
};export default Card;

const StyledWrapper = styled.div`
  section.card {
    background-color: #5a6e6c; /* card background */
    color: #e9e3d6; /* icon and text default color */
    width: 250px;
    height: 250px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin-left: 50px;
    margin-top:30px;
    margin-botton:20px
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  }

  .card__content {
    color: #e9e3d6;
    background-color: #5a6e6c;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: all 0.6s ease;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
   font-family: Yeseva One;
    font-size: 20px;
    font-weight: 700;
    color: #e9e3d6;
    margin: 0;
  }

  .card__description {
    
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.4;
    color: #e9e3d6;
    font-family: Frank Ruhl Libre;
  }

  .card:hover svg {
    scale: 0;
  }
`;
