import React from 'react';
import styled from 'styled-components';

export const ContactButton = () => {
  return (
    <StyledWrapper>
      <a href="#contact">
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow" />
        </span>
        <span className="button-text">Contact Me</span>
      </button>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   background: transparent;
   padding: 0;
   font-size: inherit;
   font-family: inherit;
  }

  button.learn-more {
   width: 12rem;
   height: auto;
  }

  button.learn-more .circle {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: relative;
   display: block;
   margin: 0;
   width: 3rem;
   height: 3rem;
   background: #1a1a1a;
   border: 1px solid rgba(34, 197, 94, 0.3);
   border-radius: 1.625rem;
   box-shadow: 0 0 20px rgba(34, 197, 94, 0.05);
  }

  button.learn-more .circle .icon {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   background: #22c55e;
  }

  button.learn-more .circle .icon.arrow {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
  }

  button.learn-more .circle .icon.arrow::before {
   position: absolute;
   content: "";
   top: -0.29rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #22c55e;
   border-right: 0.125rem solid #22c55e;
   transform: rotate(45deg);
  }

  button.learn-more .button-text {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 0.75rem 0;
   margin: 0 0 0 1.85rem;
   color: #D7E2EA;
   font-weight: 700;
   line-height: 1.6;
   text-align: center;
   text-transform: uppercase;
   letter-spacing: 0.5px;
  }

  button:hover .circle {
   width: 100%;
   background: rgba(34, 197, 94, 0.08);
   border-color: rgba(34, 197, 94, 0.5);
   box-shadow: 0 0 40px rgba(34, 197, 94, 0.15);
  }

  button:hover .circle .icon.arrow {
   background: #22c55e;
   transform: translate(1rem, 0);
  }

  button:hover .circle .icon.arrow::before {
   border-top-color: #22c55e;
   border-right-color: #22c55e;
  }

  button:hover .button-text {
   color: #22c55e;
  }

  /* Responsive */
  @media (max-width: 640px) {
    button.learn-more {
      width: 10rem;
    }

    button.learn-more .circle {
      width: 2.5rem;
      height: 2.5rem;
    }

    button.learn-more .button-text {
      font-size: 0.85rem;
      padding: 0.55rem 0;
      margin: 0 0 0 1.5rem;
    }

    button.learn-more .circle .icon.arrow {
      left: 0.5rem;
      width: 0.9rem;
    }

    button.learn-more .circle .icon.arrow::before {
      width: 0.5rem;
      height: 0.5rem;
      top: -0.22rem;
    }
  }

  @media (max-width: 480px) {
    button.learn-more {
      width: 8.5rem;
    }

    button.learn-more .circle {
      width: 2.2rem;
      height: 2.2rem;
    }

    button.learn-more .button-text {
      font-size: 0.75rem;
      padding: 0.45rem 0;
      margin: 0 0 0 1.3rem;
    }

    button.learn-more .circle .icon.arrow {
      left: 0.4rem;
      width: 0.8rem;
    }

    button.learn-more .circle .icon.arrow::before {
      width: 0.4rem;
      height: 0.4rem;
      top: -0.2rem;
    }
  }`;

export default ContactButton;