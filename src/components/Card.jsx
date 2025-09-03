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
    position: relative;
    background-color: #5a6e6c;
    color: #e9e3d6;
    width: 250px;
    height: 250px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    perspective: 1000px;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin-left: 50px;
    margin-top: 30px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #5a6e6c;
    color: #e9e3d6;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: transform 0.6s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card__title {
    font-family: 'Yeseva One', cursive;
    font-size: 23px;
    font-weight: 700;
    color: #e9e3d6;
    margin: 0;
  }

  .card__description {
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.4;
    color: #e9e3d6;
    font-family: 'Frank Ruhl Libre', serif;
  }

  .card svg {
    transition: transform 0.5s ease;
  }

  .card:hover svg {
    transform: scale(0);
  }
`;
