import React from 'react';
import styled from 'styled-components';
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-container">
        <div className="loader">
          <span><span /><span /><span /><span /></span>
          <div className="base">
            <span />
            <div className="face" />
          </div>
        </div>
        <div className="longfazers">
          <span /><span /><span /><span />
        </div>
        <div className="loader-text">
          <h1>SIBASIS ROUTRAY</h1>
          <p>Building Something Awesome...</p>
          <div className="loading-bar">
            <div className="loading-progress" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader-container {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 400px;
    background: #000000;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader {
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -50px;
    margin-top: -30px;
    animation: speeder 0.4s linear infinite;
    z-index: 2;
  }
  
  .loader > span {
    height: 5px;
    width: 35px;
    background: #059669;
    position: absolute;
    top: -19px;
    left: 60px;
    border-radius: 2px 10px 1px 0;
  }
  
  .base span {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 100px solid #ffffff;
    border-bottom: 6px solid transparent;
  }
  
  .base span:before {
    content: "";
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: #ffffff;
    position: absolute;
    right: -110px;
    top: -16px;
  }
  
  .base span:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 0 solid transparent;
    border-right: 55px solid #ffffff;
    border-bottom: 16px solid transparent;
    top: -16px;
    right: -98px;
  }
  
  .face {
    position: absolute;
    height: 12px;
    width: 20px;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    transform: rotate(-40deg);
    right: -125px;
    top: -15px;
  }
  
  .face:after {
    content: "";
    height: 12px;
    width: 12px;
    background: #ffffff;
    right: 4px;
    top: 7px;
    position: absolute;
    transform: rotate(40deg);
    transform-origin: 50% 50%;
    border-radius: 0 0 0 2px;
  }
  
  .loader > span > span:nth-child(1),
  .loader > span > span:nth-child(2),
  .loader > span > span:nth-child(3),
  .loader > span > span:nth-child(4) {
    width: 30px;
    height: 1px;
    background: #ffffff;
    position: absolute;
    animation: fazer1 0.2s linear infinite;
  }
  
  .loader > span > span:nth-child(2) {
    top: 3px;
    animation: fazer2 0.4s linear infinite;
  }
  
  .loader > span > span:nth-child(3) {
    top: 1px;
    animation: fazer3 0.4s linear infinite;
    animation-delay: -1s;
  }
  
  .loader > span > span:nth-child(4) {
    top: 4px;
    animation: fazer4 1s linear infinite;
    animation-delay: -1s;
  }
  
  @keyframes fazer1 {
    0% {
      left: 0;
    }
    100% {
      left: -80px;
      opacity: 0;
    }
  }
  
  @keyframes fazer2 {
    0% {
      left: 0;
    }
    100% {
      left: -100px;
      opacity: 0;
    }
  }
  
  @keyframes fazer3 {
    0% {
      left: 0;
    }
    100% {
      left: -50px;
      opacity: 0;
    }
  }
  
  @keyframes fazer4 {
    0% {
      left: 0;
    }
    100% {
      left: -150px;
      opacity: 0;
    }
  }
  
  @keyframes speeder {
    0% {
      transform: translate(2px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -3px) rotate(-1deg);
    }
    20% {
      transform: translate(-2px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 3px) rotate(-1deg);
    }
    60% {
      transform: translate(-1px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-2px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(2px, 1px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  
  .longfazers {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  
  .longfazers span {
    position: absolute;
    height: 2px;
    width: 20%;
    background: #ffffff;
    opacity: 0.3;
  }
  
  .longfazers span:nth-child(1) {
    top: 20%;
    animation: lf 0.6s linear infinite;
    animation-delay: -5s;
  }
  
  .longfazers span:nth-child(2) {
    top: 40%;
    animation: lf2 0.8s linear infinite;
    animation-delay: -1s;
  }
  
  .longfazers span:nth-child(3) {
    top: 60%;
    animation: lf3 0.6s linear infinite;
  }
  
  .longfazers span:nth-child(4) {
    top: 80%;
    animation: lf4 0.5s linear infinite;
    animation-delay: -3s;
  }
  
  @keyframes lf {
    0% {
      left: 200%;
    }
    100% {
      left: -200%;
      opacity: 0;
    }
  }
  
  @keyframes lf2 {
    0% {
      left: 200%;
    }
    100% {
      left: -200%;
      opacity: 0;
    }
  }
  
  @keyframes lf3 {
    0% {
      left: 200%;
    }
    100% {
      left: -100%;
      opacity: 0;
    }
  }
  
  @keyframes lf4 {
    0% {
      left: 200%;
    }
    100% {
      left: -100%;
      opacity: 0;
    }
  }

  .loader-text {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 3;
    color: #ffffff;
    width: 80%;
    max-width: 600px;
  }

  .loader-text h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    letter-spacing: 4px;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #ffffff, #888888, #ffffff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 2s linear infinite;
    text-transform: uppercase;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .loader-text p {
    font-size: clamp(0.8rem, 1.2vw, 1.2rem);
    font-weight: 300;
    letter-spacing: 6px;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }

  .loading-bar {
    width: 100%;
    max-width: 400px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    margin: 20px auto 0;
    overflow: hidden;
    position: relative;
  }

  .loading-progress {
    width: 30%;
    height: 100%;
    background: linear-gradient(90deg, #ffffff, #059669);
    border-radius: 2px;
    animation: loadingProgress 1.5s ease-in-out infinite;
    position: absolute;
    left: -30%;
  }

  @keyframes loadingProgress {
    0% {
      left: -30%;
      width: 30%;
    }
    50% {
      width: 60%;
    }
    100% {
      left: 100%;
      width: 30%;
    }
  }

  /* Subtle particle effect */
  .loader-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.1), transparent),
      radial-gradient(2px 2px at 80% 80%, rgba(255,255,255,0.1), transparent);
    background-size: 200px 200px;
    animation: particles 20s linear infinite;
    pointer-events: none;
  }

  @keyframes particles {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-200px);
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .loader {
      top: 40%;
    }
    
    .loader-text {
      bottom: 15%;
    }
  }
`;

export default Loader;