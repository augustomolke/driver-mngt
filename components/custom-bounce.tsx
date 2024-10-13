import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`

  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  10% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  30% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  40% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  60% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  70% {
    transform: scale3d(1.02, 1.02, 1.02);
  }

  80% {
    transform: scale3d(0.98, 0.98, 0.98);
  }

  90% {
    opacity: 1;
    transform: scale3d(1.01, 1.01, 1.01);
  }

  100% {
    transform: scale3d(0.99, 0.99, 0.99);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }


`;

export default function CustomAnimation({ children, duration }) {
  return (
    <Reveal duration={duration} keyframes={customAnimation}>
      {children}
    </Reveal>
  );
}
