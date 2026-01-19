import React from 'react';
import styled from 'styled-components';

const SharinganLoader = () => {
  return (
    <StyledWrapper>
      <div className="sharingon">
        <div className="ring">
          <div className="to" />
          <div className="to" />
          <div className="to" />
          <div className="circle" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Scale container */
  font-size: 16px; 

  .sharingon {
    width: 8em;
    height: 8em;
    background-color: #10b981; /* Emerald 500 */
    border: 6px solid black;
    animation: rot 1.5s ease-in-out infinite;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
  }

  .ring {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 4.5em;
    height: 4.5em;
    border: 4px solid rgba(0, 0, 0, 0.4);
    transform: translate(-50%,-50%);
    border-radius: 50%;
  }

  .to, .circle {
    border-radius: 50%;
    position: absolute;
    content: "";
    background-color: black;
  }

  .to {
    width: 1.1em;
    height: 1.1em;
  }

  .to:nth-child(1) {
    top: -0.6em;
    left: 50%;
    transform: translateX(-40%);
  }

  .to::before {
    content: "";
    position: absolute;
    top: -0.6em;
    right: -0.25em;
    width: 1.3em;
    height: 1.1em;
    box-sizing: border-box;
    border-left: 18px solid black;
    border-radius: 100% 0 0;
  }

  .to:nth-child(2) {
    bottom: 0.6em;
    left: -0.45em;
    transform: rotate(-120deg);
  }

  .to:nth-child(3) {
    bottom: 0.6em;
    right: -0.45em;
    transform: rotate(120deg);
  }

  .circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 20px 1px black;
    width: 1.3em;
    height: 1.3em;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default SharinganLoader;
