import React, { useState, useEffect } from 'react';
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
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval;

    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && inputValue.trim() !== secret.toString()) {
      clearInterval(interval);
      setIncorrectAnswers(prevIncorrectAnswers => prevIncorrectAnswers + 1);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timer, inputValue, secret]);
  

  const generateEquation = () => {
    const { equations, secret } = randomEquationsLvl1();
    setEquation(equations);
    setSecret(secret);
    setShowSecret(false);
    setInputValue('');
  };

  const generateEquationAndStartTimer = () => {
    generateEquation();
    setTimer(60);
    setTimerActive(true);
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
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setShowSecret(secret);
      if (timer > 0) {
        setIncorrectAnswers(incorrectAnswers + 1);
      }
    }
  };

  return (
    <div className="App">
      <div className="timer">Time Remaining: {timer} seconds</div>

      <ScoreCounter correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />

      <h1>Simple Linear Equations Mentally</h1>
      <div className="button-container">
        <button onClick={generateEquation}>Generate equation</button>
        <button onClick={generateEquationAndStartTimer}>Play with Timer</button>
      </div>

      <div className="equation">{equation}</div>
      <textarea
        rows="4"
        cols="5"
        placeholder="write your solution here..."
        value={inputValue}
        onChange={handleInputChange}
      />

      <button onClick={checkAnswer}>Сheck the answer</button>

      {showSecret === 'win' ? (
        <div className="win-message">YOU WIN!</div>
      ) : showSecret && (
        <div className="secret"> Answer is: {showSecret}</div>
      )}
    </div>
  );
};

export default App;
