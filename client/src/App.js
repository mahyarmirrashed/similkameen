import './App.css';
import './style.css';
import { useState } from 'react';

const axios = require('axios').default;

const MAXIMUM_HEIGHT = 4;

const createBoxes = (str) => {
  console.log(str);
  let arr = [];
  let vals = str.split(' ');
  let len = vals.length;

  for (let i = 0; i < MAXIMUM_HEIGHT; i++) {
    arr[i] = new Array(len);
    for (let k = 0; k < len; k++) {
      if (i >= MAXIMUM_HEIGHT - parseInt(vals[k])) {
        arr[i][k] = 1;
      } else {
        arr[i][k] = 0;
      }
    }
  }

  return arr;
};

const App = () => {
  const [input, setInput] = useState('');
  const [process, setProcess] = useState('');
  const [inputGrid, setInputGrid] = useState([[]]);
  const [randomGrid, setRandomGrid] = useState([[]]);
  const [outputGrid, setOutputGrid] = useState([[]]);

  const onClick = (e) => {
    e.preventDefault();

    let execute = '';
    let randomize = '';
    let investigate = '';

    axios
      .post('http://localhost:4000/execute', {
        input,
        process,
        height: MAXIMUM_HEIGHT,
      })
      .then((res) => (execute = res.data.output))
      .then(() =>
        axios.post('http://localhost:4000/randomize', {
          input,
          height: MAXIMUM_HEIGHT,
        }),
      )
      .then((res) => (randomize = res.data.output))
      .then(() =>
        axios.post('http://localhost:4000/investigate', {
          input: randomize,
          output: execute,
          height: MAXIMUM_HEIGHT,
        }),
      )
      .then((res) => (investigate = res.data.process))
      .then(() => {
        setInputGrid(createBoxes(input));
        setRandomGrid(createBoxes(randomize));
        setOutputGrid(createBoxes(execute));
      })
      .catch(console.error);

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
          <h3>Welcome</h3>
          <span>
            This tool was created by team Similkameen for the 2022 Western
            Engineering Conference. Read more about the diagrams in the about
            section and enter data in the user entry section to see the tool in
            action.
          </span>
        </div>
        <div className="centerpanel">
          <div className="center status_msg">
            <strong>Initial configuration</strong>
          </div>
          <div className="box_container" id="input_box_container">
            {inputGrid.map((nums, X) => (
              <div className="row" key={X}>
                {nums.map((nums, Y) => (
                  <div
                    className={inputGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
                    key={X * 100 + Y}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="center status_msg">
            <strong>Randomized configuration</strong>
          </div>
          <div className="box_container" id="randomized_box_container">
            {randomGrid.map((nums, X) => (
              <div className="row" key={X}>
                {nums.map((nums, Y) => (
                  <div
                    className={randomGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
                    key={X * 100 + Y}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="center status_msg">
            <strong>Final configuration</strong>
          </div>
          <div className="box_container" id="input_box_container">
            {outputGrid.map((nums, X) => (
              <div className="row" key={X}>
                {nums.map((nums, Y) => (
                  <div
                    className={outputGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
                    key={X * 100 + Y}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="side">
          <h3>About</h3>
          <span>
            When a user enters a valid input state and process configuration,
            Three diagrams will be shown:
          </span>
          <br></br>
          <ul>
            <li>
              The first diagram is the inital configuration that the user
              inputs.{' '}
            </li>
            <li>
              The second diagram is a randomized configuration of the initial
              configuration.
            </li>
            <li>
              The third diagram is the final configuration, along with the steps
              needed to turn the randomized configuration into the final one.
            </li>
          </ul>
        </div>
      </div>
      <div className="content_container">
        <div className="input_tile">
          <div className="center status_msg">
            <h3>User Entry</h3>
          </div>
          <span className="center status_msg">
            To use the crane tool, input the initial configuration and process
            configuration as numbers separated by a space.
          </span>
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
