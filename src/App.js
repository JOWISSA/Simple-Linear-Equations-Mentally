import React, { useState } from 'react';
import './App.css';

import randomEquationsLvl1 from './components/EquationGenerator';
import ScoreCounter from './components/ScoreCounter';

const App = () => {
  const [equation, setEquation] = useState('');
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);

  const generateEquation = () => {
    const { equations, secret } = randomEquationsLvl1();
    setEquation(equations);
    setSecret(secret);
    setShowSecret(false);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const checkAnswer = () => {
    if (inputValue.trim() === secret.toString()) {
      setShowSecret('win');
      setScore(score + 1);
    } else {
      setShowSecret(secret);
      setScore(score - 1);
    }
  };
  

  return (
    <div className="App">
      <ScoreCounter score={score} />
      <h1>Simple Linear Equations Mentally</h1>
      <button onClick={generateEquation}>Generate equation</button>
      <div className="equation">{equation}</div>
      <textarea
        rows="4"
        cols="5"
        placeholder="write your solution here..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={checkAnswer}>
        Сheck the answer
      </button>
      {showSecret === 'win' 
        ? ( 
        <div className="win-message">YOU WIN!</div>
        ) 
        : showSecret && (
        <div className="secret"> Answer is: {showSecret}</div>
        )
      }

    </div>
  );
};

export default App;
