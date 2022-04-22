import { useState, useEffect } from 'react';
import styles from './App.module.css';

const isPrime = n => {
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i < Math.floor(Math.sqrt(n)) + 1; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

const isFibonacci = n => {
  if (n === 0 || n === 1) return true;
  let a1 = 0;
  let a2 = 1;
  let tmp = 0;
  while (a2 < n) {
    tmp = a2;
    a2 = a2 + a1;
    a1 = tmp;
  }
  return a2 === n;
}

function App() {
  const [numberType, setNumberType] = useState('prime');
  const [number, setNumber] = useState('');
  const [flag, setFlag] = useState('');

  const onNumberChange = (e) => {
    let inputValue = Number(e.target.value);
    if (typeof inputValue !== 'number') {
      return setNumber('')
    }
    if (inputValue < 0) {
      return setNumber(1);
    }
    if (inputValue % 1 !== 0) {
      inputValue = Math.round(inputValue);
    }
    setNumber(inputValue);
  };

  const onChangeNumberType = (e) => {
    setNumberType(e.target.value)
  }

  const processNumber = (number, numberType) => {
    if (typeof number !== 'number' || !numberType) {
      return;
    }
    switch (numberType) {
      case 'prime': {
        return setFlag(isPrime(number));
      }
      case 'fibonacci': {
        return setFlag(isFibonacci(number));
      }
      default: return;
    }
  }

  useEffect(() => {
    processNumber(number, numberType)
  }, [number, numberType])

  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <input
          type="number"
          value={number}
          onChange={onNumberChange} />
      </div>
      <div
        className={styles.border}
        value={numberType}
        onChange={onChangeNumberType}
      >
        <select name="calculateType" id="calculateType">
          <option selected value="prime">isPrime</option>
          <option value="fibonacci">isFibonacci</option>
        </select>
      </div>
      <div className={styles.border}>
        <p>{flag.toString()}</p>
      </div>
    </div>
  );
}

export default App;
