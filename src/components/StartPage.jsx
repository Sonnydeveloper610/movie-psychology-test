import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2.1rem;
  color: #f9a8d4;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  background: #ffd6e0;
  color: #22223b;
  border: none;
  border-radius: 18px;
  font-size: 1.1rem;
  padding: 14px 0;
  width: 100%;
  margin: 12px 0 0 0;
  font-weight: 600;
  box-shadow: 0 2px 8px #f9a8d440;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #f9a8d4; color: #fff; }
`;

export default function StartPage({ t, onStart }) {
  return (
    <div>
      <Title>{t.testName}</Title>
      <Button onClick={onStart}>{t.start}</Button>
    </div>
  );
}
