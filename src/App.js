import React, { useState } from 'react';
import './App.css';

const randomValue = (value) => {
  return (Math.ceil(Math.random() * value)) * ((-1) ** (Math.ceil(Math.random() * 4)));
};

const randomAbsolute = (value) => {
  return Math.floor(Math.random() * value);
};

const randomEquationsLvl1 = () => {
  const variableNames = ['x', 'y', 't', 'z', 'n', 'm', 'a', 'b'];
  const variable = variableNames[randomAbsolute(variableNames.length)];
  const secret = randomValue(25); // maximum number limit [-25; 25]
  const multiplyOrDivide = randomAbsolute(2);
  const factor = randomValue(15);
  const addOrSubtract = randomAbsolute(2);
  const freeValue = randomValue(30);
  let total = 0;
  let equations = '';

  if (multiplyOrDivide) {
    if (addOrSubtract) {
      total = secret * factor + freeValue;

      if (freeValue >= 0) {
        equations = `${factor}${variable} ${(freeValue) ? `+ ${freeValue} ` : ''}= ${total}`;
      } else {
        equations = `${factor}${variable} + (${freeValue}) = ${total}`;
      }
    } else {
      total = secret * factor - freeValue;

      if (freeValue >= 0) {
        equations = `${factor}${variable} ${(freeValue) ? `- ${freeValue} ` : ''}= ${total}`;
      } else {
        equations = `${factor}${variable} - (${freeValue}) = ${total}`;
      }
    }
  } else {
    if (addOrSubtract) {
      total = (freeValue * factor + secret) / factor;

      if (Number.isInteger(total)) {
        if (freeValue >= 0) {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `${(freeValue) ? `+ ${freeValue} ` : ''}= ${total}`;
        } else {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `+ (${freeValue}) = ${total}`;
        }

      } else {
        if (freeValue >= 0) {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `${(freeValue) ? `+ ${freeValue} ` : ''}= ${freeValue * factor + secret} / ${factor}`;
        } else {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `+ (${freeValue}) = ${freeValue * factor + secret} / ${factor}`;
        }

      }

    } else {
      total = (freeValue * factor - secret) / factor;

      if (Number.isInteger(total)) {
        if (freeValue >= 0) {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `${(freeValue) ? `- ${freeValue} ` : ''}= ${total}`;
        } else {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `- (${freeValue}) = ${total}`;
        }

      } else {
        if (freeValue >= 0) {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `${(freeValue) ? `- ${freeValue} ` : ''}= ${freeValue * factor + secret} / ${factor}`;
        } else {
          equations = `${(factor > 0) ? `${variable} / ${factor}`: `${variable} / (${factor})`} ` 
            + `- (${freeValue}) = ${freeValue * factor + secret} / ${factor}`;
        }

      }
    }
  }

  return { equations, secret};
};


const App = () => {
  const [equation, setEquation] = useState('');
  const [secret, setSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  const generateEquation = () => {
    const { equations, secret } = randomEquationsLvl1();
    setEquation(equations);
    setSecret(secret);
    setShowSecret(false);
  };

  return (
    <div className="App">
      <h1>Simple Linear Equations Mentally</h1>
      <button onClick={generateEquation}>Generate equation</button>
      <div className="equation">{equation}</div>
      <textarea
        rows="4"
        cols="50"
        placeholder="write your solution here..."
      />
      <button onClick={() => setShowSecret(true)}>
        Show Secret
      </button>
      {showSecret && <div className="secret">Secret meaning: {secret}</div>}
    </div>
  );
};


export default App;
