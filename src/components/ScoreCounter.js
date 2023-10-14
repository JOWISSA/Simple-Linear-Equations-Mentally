import React from 'react';

const ScoreCounter = ({ score }) => {
  const scoreClassName = score >= 0 ? 'positive' : 'negative';

  return <div className={`score ${scoreClassName}`}>Score: {score}</div>;
};

export default ScoreCounter;
