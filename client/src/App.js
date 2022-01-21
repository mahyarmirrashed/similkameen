import logo from './logo.svg';
import './App.css';
import './style.css';
import {useState} from 'react'

const App = () => {

  const [input, setInput] = useState('');
  const [process, setProcess] = useState('');

  const onClick = (e) => {
    e.preventDefault();
    console.log(input, process)
    setInput('')
    setProcess('')
  }
  return (
    <div className="App">
      <div className="header">
          <h1>QuickBuy: Crane Tool</h1>
      </div>
      <div className='content_container'>
        <div className='side'>
          <h3>Rules</h3>
          <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span>
        </div>
        <div className='centerpanel'>

        </div> 
        <div className='side'>
          <h3>Rules</h3>
          <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span>
        </div>
      </div>
      <div className='content_container'>
        <div className='input_tile' >
          <div className='center status_msg'>
            <h3>Output Configuration</h3>
          </div>
          <span className='center status_msg'>
            To 
          </span>
          <div className='center'>
            <label htmlFor="input_config">Input Configuration:</label>
            <input type ='text' id="input_config" value = {input} onChange ={(e) => setInput(e.target.value)}/>
            <label for="process_config">Process Configuration:</label>
            <input id="process_config" value = {process} onChange = {(e) => setProcess(e.target.value)}/>
            <button id="send_input_and_process" value="Go" onClick={onClick}/>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
