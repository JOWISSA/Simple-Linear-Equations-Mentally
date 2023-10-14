import React from 'react';

const ScoreCounter = ({ correctAnswers, incorrectAnswers }) => {
  return (
    <div className="score">
      <div className='positive'>
        Correct Answers: {correctAnswers}
      </div>
    <br/>
      <div className='negative'>
        Incorrect Answers: {incorrectAnswers}
      </div>
    </div>
  );
};

export default ScoreCounter;
