import './App.css';
import './style.css';
import { useState } from 'react';
const ax = require('axios').default;

const APICall = (endpoint, params) => {
  ax.post(endpoint, params)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return {};
};

let inputNumbers = [];
let randomNumbers = [];
let outputNumbers = [];

const App = () => {
  const [input, setInput] = useState('');
  const [process, setProcess] = useState('');
  const [inputGrid, setInputGrid] = useState([[]]);
  const [randomGrid, setRandomGrid] = useState([[]]);
  const [outputGrid, setOutputGrid] = useState([[]]);

  const onClick = (e) => {
    e.preventDefault();
    console.log(input, process);

    let random = '';
    let output = '';

    output = APICall('http://localhost:4000/execute', {
      input: input,
      process: process,
    });
    random = APICall('http://localhost:4000/randomize', {
      input: input,
    });
    APICall('http://localhost:4000/investigate', {
      input: random,
      output: output,
    });

    for(let i = 0; i < 4; i++){
      inputNumbers[i] = new Array(7)
      for(let k = 0; k < 7; k++){
        inputNumbers[i][k] = 1
      }
    }
    randomNumbers = inputNumbers
    outputNumbers = inputNumbers
    setInputGrid(inputNumbers);
    setRandomGrid(randomNumbers);
    setOutputGrid(outputNumbers);

    setInput('');
    setProcess('');
  };
  return (
    <div className="App">
      <div className="header">
        <h1>QuickBuy: Crane Tool</h1>
      </div>
      <div className="content_container">
        <div className="side">
          <h3>Rules</h3>
          <span>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </span>
        </div>
        <div className="centerpanel">
          <div className='box_container' id='input_box_container'>
            {inputGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map(Y => (
                  <div className={inputGrid[X][Y]===0?'cell':'cell toggled'} key={100*X+Y}/>
                ))}
              </div>
            ))}
          </div>
          <div className='box_container' id='randomized_box_container'>
            {randomGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map(Y => (
                  <div className={randomGrid[X][Y]===0?'cell':'cell toggled'} key={100*X+Y}/>
                ))}
              </div>
            ))}
          </div>
          <div className='box_container' id='input_box_container'>
            {outputGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map(Y => (
                  <div className={outputGrid[X][Y]===0?'cell':'cell toggled'} key={100*X+Y}/>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="side">
          <h3>Rules</h3>
          <span>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </span>
        </div>
      </div>
      <div className="content_container">
        <div className="input_tile">
          <div className="center status_msg">
            <h3>Output Configuration</h3>
          </div>
          <span className="center status_msg">To</span>
          <div className="center">
            <label htmlFor="input_config">Input Configuration:</label>
            <input
              type="text"
              id="input_config"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <label htmlFor="process_config">Process Configuration:</label>
            <input
              id="process_config"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
            />
            <button id="send_input_and_process" onClick={onClick}>
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
