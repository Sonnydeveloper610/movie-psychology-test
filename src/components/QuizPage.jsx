import React from "react";
import styled from "styled-components";

const Progress = styled.div`
  font-size: 0.95rem;
  color: #a5b4fc;
  margin-bottom: 8px;
`;

const Question = styled.h2`
  font-size: 1.2rem;
  color: #22223b;
  margin-bottom: 16px;
  text-align: center;
`;

const OptionButton = styled.button`
  background: #a5b4fc;
  color: #fff;
  border: none;
  border-radius: 18px;
  font-size: 1.1rem;
  padding: 12px 0;
  width: 100%;
  margin: 10px 0 0 0;
  font-weight: 600;
  box-shadow: 0 2px 8px #f9a8d440;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #f9a8d4; }
`;

export default function QuizPage({ t, questions, current, onAnswer }) {
  const q = questions[current];
  return (
    <div>
      <Progress>{current + 1} / {questions.length}</Progress>
      <Question>{q.q}</Question>
      {q.options.map((option, idx) => (
        <OptionButton key={idx} onClick={() => onAnswer(option)}>
          {option}
        </OptionButton>
      ))}
    </div>
  );
}
