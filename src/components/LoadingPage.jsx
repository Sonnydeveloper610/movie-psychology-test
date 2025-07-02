import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const Loader = styled.div`
  margin: 32px auto;
  border: 6px solid #f3e8ff;
  border-top: 6px solid #f9a8d4;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`;

const Question = styled.h2`
  font-size: 1.2rem;
  color: #22223b;
  margin-bottom: 16px;
  text-align: center;
`;

export default function LoadingPage({ t }) {
  return (
    <div>
      <Question>{t.analyzing}</Question>
      <Loader />
    </div>
  );
}
