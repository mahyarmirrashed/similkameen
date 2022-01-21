import './App.css';
import './style.css';
import { useState } from 'react';
const ax = require('axios').default;
const MAX_HEIGHT = 4;
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

const createBoxes = (str) => {
  let arr = [];
  let vals = str.split(' ');
  let len = vals.length;
  for (let i = 0; i < MAX_HEIGHT; i++) {
    arr[i] = new Array(len);
    for (let k = 0; k < len; k++) {
      if (i >= MAX_HEIGHT - parseInt(vals[k])) {
        arr[i][k] = 1;
      } else {
        arr[i][k] = 0;
      }
    }
  }
  return arr;
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

    // output = APICall('localhost:4000/execute', {
    //   input: input,
    //   process: process,
    //   height: MAX_HEIGHT
    // });
    // random = APICall('localhost:4000/randomize', {
    //   input: input,
    //   height: MAX_HEIGHT
    // });
    // APICall('localhost:4000/investigate', {
    //   input: random,
    //   output: output,
    //   height: MAX_HEIGHT
    // });

    inputNumbers = createBoxes(input);
    //randomNumbers = inputNumbers
    //outputNumbers = inputNumbers
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
          <div className="box_container" id="input_box_container">
            {inputGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map((nums, Y) => (
                  <div className={inputGrid[X][Y]===0?'cell':'cell toggled'} key={X*100+Y}/>
                ))}
              </div>
            ))}
          </div>
          <div className="box_container" id="randomized_box_container">
            {randomGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map((nums, Y) => (
                  <div className={randomGrid[X][Y]===0?'cell':'cell toggled'} key={X*100+Y}/>
                ))}
              </div>
            ))}
          </div>
          <div className="box_container" id="input_box_container">
            {outputGrid.map((nums, X) => (
              <div className = 'row' key={X}>
                {nums.map((nums, Y) => (
                  <div className={outputGrid[X][Y]===0?'cell':'cell toggled'} key={X*100+Y}/>
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
