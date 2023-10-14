import React, { useState } from 'react';
import './App.css';

import randomEquationsLvl1 from './components/EquationGenerator';
import ScoreCounter from './components/ScoreCounter';

const App = () => {
  const [equation, setEquation] = useState('');
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const generateEquation = () => {
    const { equations, secret } = randomEquationsLvl1();
    setEquation(equations);
    setSecret(secret);
    setShowSecret(false);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^-?\d*$/;
  
    if (regex.test(inputValue)) {
      setInputValue(inputValue);
    }
  };

  const checkAnswer = () => {
    if (inputValue.trim() === secret.toString()) {
      setShowSecret('win');
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setShowSecret(secret);
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };
  

  return (
    <div className="App">

       <ScoreCounter 
          correctAnswers={correctAnswers} 
          incorrectAnswers={incorrectAnswers} 
        />

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
      
      <button onClick={checkAnswer}>Сheck the answer</button>

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
