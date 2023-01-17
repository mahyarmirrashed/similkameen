import './App.css';
import './style.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { maxHeight, padding, spacing } from '@mui/system';

const axios = require('axios').default;

const MAXIMUM_HEIGHT = 4;
const NUMBER_STRING_FORMAT = /^[0-4 ]*[0-4]$/;

const createBoxes = (str) => {
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
  const [randomProc, setRandomProc] = useState('');
  const [inputGrid, setInputGrid] = useState([[]]);
  const [randomGrid, setRandomGrid] = useState([[]]);
  const [outputGrid, setOutputGrid] = useState([[]]);
  const [inputBool, setInputBool] = useState(true);
  const [procBool, setProcBool] = useState(true);

  const onClick = (e) => {
    e.preventDefault();

    let clean_input = input.trim();
    let clean_process = process.trim();

    setProcBool(clean_process.match(/^[0-4 ]*0$/));
    setInputBool(clean_input.match(NUMBER_STRING_FORMAT));
    if (
      !(
        clean_process.match(/^[0-4 ]*0$/) &&
        clean_input.match(NUMBER_STRING_FORMAT)
      )
    ) {
      //setInput('');
      //setProcess('');
      return;
    }

    let execute = '';
    let randomize = '';
    let proc = '';

    axios
      .post('http://localhost:4000/execute', {
        input: clean_input,
        process: clean_process,
        height: MAXIMUM_HEIGHT,
      })
      .then((res) => (execute = res.data.output))
      .then(() =>
        axios.post('http://localhost:4000/randomize', {
          input: clean_input,
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
      .then((res) => (proc = res.data.process))
      .then(() => {
        setInputGrid(createBoxes(clean_input));
        setRandomGrid(createBoxes(randomize));
        setOutputGrid(createBoxes(execute));
        setRandomProc(proc);
      })
      .catch(console.error);

    setInput('');
    setProcess('');
  };

  return (
    <div className="App">
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">Similkameen</Typography>
          </Toolbar>
        </AppBar>
        <Paper elevation={20}>
          <Box id="form" noValidate autoComplete="off" margin={2} padding={2}>
            <Typography variant="h4">Input</Typography>
            <div>
              <TextField
                id="input_config"
                label="Input Configuration"
                variant="outlined"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                margin="normal"
                error={!inputBool}
                helperText={
                  inputBool
                    ? ''
                    : 'must be numbers 0-' +
                      MAXIMUM_HEIGHT +
                      ' separated with spaces'
                }
              />
            </div>
            <div>
              <TextField
                id="process_config"
                label="Process Configuration"
                variant="outlined"
                required
                value={process}
                onChange={(e) => setProcess(e.target.value)}
                margin="normal"
                error={!procBool}
                helperText={
                  procBool
                    ? ''
                    : 'must be numbers 0-4 separated with spaces and ending with 0'
                }
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              margin="normal"
              onClick={onClick}
            >
              Go!
            </Button>
          </Box>
        </Paper>
        <Grid container spacing={2} paddingBottom={10}>
          <Grid item xs={12} sm={12} md={4}>
            <CardActionArea>
              <Card raised sx={{ height: 300 }}>
                <CardContent>
                  {inputGrid.map((nums, X) => (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {nums.map((nums, Y) => (
                        <Box
                          sx={{
                            width: '25px',
                            height: '25px',
                            border: '2px solid white',
                            padding: '5px',
                            backgroundColor:
                              inputGrid[X][Y] === 0 ? 'white' : 'primary.main',
                            '&:hover': {
                              width: inputGrid[X][Y] === 0 ? '25px' : '29px',
                              height: inputGrid[X][Y] === 0 ? '25px' : '29px',
                              border:
                                inputGrid[X][Y] === 0
                                  ? '2px solid lightgray'
                                  : '0px',
                            },
                          }}
                        ></Box>
                      ))}
                    </Box>
                  ))}
                </CardContent>
                <CardHeader title="Initial Configuration" subheader="" />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CardActionArea>
              <Card raised sx={{ height: 300 }}>
                <CardContent>
                  {randomGrid.map((nums, X) => (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {nums.map((nums, Y) => (
                        <Box
                          sx={{
                            width: '25px',
                            height: '25px',
                            border: '2px solid white',
                            padding: '5px',
                            backgroundColor:
                              randomGrid[X][Y] === 0 ? 'white' : 'primary.main',
                            '&:hover': {
                              width: randomGrid[X][Y] === 0 ? '25px' : '29px',
                              height: randomGrid[X][Y] === 0 ? '25px' : '29px',
                              border:
                                randomGrid[X][Y] === 0
                                  ? '2px solid lightgray'
                                  : '0px',
                            },
                          }}
                        ></Box>
                      ))}
                    </Box>
                  ))}
                </CardContent>
                <CardHeader
                  title="Random Configuration"
                  subheader=""
                  color="primary"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card raised sx={{ height: 300 }}>
              <CardContent>
                {outputGrid.map((nums, X) => (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {nums.map((nums, Y) => (
                      <Box
                        id={100 * X + Y}
                        sx={{
                          width: '25px',
                          height: '25px',
                          border: '2px solid white',
                          padding: '5px',
                          backgroundColor:
                            outputGrid[X][Y] === 0 ? 'white' : 'primary.main',
                          '&:hover': {
                            width: outputGrid[X][Y] === 0 ? '25px' : '29px',
                            height: outputGrid[X][Y] === 0 ? '25px' : '29px',
                            border:
                              outputGrid[X][Y] === 0
                                ? '2px solid lightgray'
                                : '0px',
                          },
                        }}
                      ></Box>
                    ))}
                  </Box>
                ))}
              </CardContent>
              <CardHeader
                title="Final Configuration"
                subheader={'Process to get from random to final: ' + randomProc}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
    //      <div className="content_container">
    //        <div className="side">
    //          <h3>Welcome</h3>
    //          <span>
    //            This tool was created by team Similkameen for the 2022 Western
    //            Engineering Conference. Read more about the diagrams in the about
    //            section and enter data in the user entry section to see the tool in
    //            action.
    //          </span>
    //        </div>
    //        <div className="centerpanel">
    //          <div className="center status_msg">
    //            <strong>Initial configuration</strong>
    //          </div>
    //          <div className="box_container" id="input_box_container">
    //            {inputGrid.map((nums, X) => (
    //              <div className="row" key={X}>
    //                {nums.map((nums, Y) => (
    //                  <div
    //                    className={inputGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
    //                    key={X * 100 + Y}
    //                  />
    //                ))}
    //              </div>
    //            ))}
    //          </div>
    //          <div className="center status_msg">
    //            <strong>Randomized configuration</strong>
    //          </div>
    //          <div className="box_container" id="randomized_box_container">
    //            {randomGrid.map((nums, X) => (
    //              <div className="row" key={X}>
    //                {nums.map((nums, Y) => (
    //                  <div
    //                    className={randomGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
    //                    key={X * 100 + Y}
    //                  />
    //                ))}
    //              </div>
    //            ))}
    //          </div>
    //          <div className="center status_msg">
    //            <strong>Final configuration</strong>
    //          </div>
    //          <div className="box_container" id="input_box_container">
    //            {outputGrid.map((nums, X) => (
    //              <div className="row" key={X}>
    //                {nums.map((nums, Y) => (
    //                  <div
    //                    className={outputGrid[X][Y] === 0 ? 'cell' : 'cell toggled'}
    //                    key={X * 100 + Y}
    //                  />
    //                ))}
    //              </div>
    //            ))}
    //          </div>
    //        </div>
    //        <div className="side">
    //          <h3>About</h3>
    //          <span>
    //            When a user enters a valid input state and process configuration,
    //            Three diagrams will be shown:
    //          </span>
    //          <br></br>
    //          <ul>
    //            <li>
    //              The first diagram is the inital configuration that the user
    //              inputs.{' '}
    //            </li>
    //            <li>
    //              The second diagram is a randomized configuration of the initial
    //              configuration.
    //            </li>
    //            <li>
    //              The third diagram is the final configuration, along with the steps
    //              needed to turn the randomized configuration into the final one.
    //            </li>
    //          </ul>
    //        </div>
    //      </div>
    //      <div className="content_container">
    //        <div className="input_tile">
    //          <div className="center status_msg">
    //            <h3>User Entry</h3>
    //          </div>
    //          <span className="center status_msg">
    //            To use the crane tool, input the initial configuration and process
    //            configuration as numbers separated by a space.
    //          </span>
    //          <div className="center">
    //            <label htmlFor="input_config">Input Configuration:</label>
    //            <input
    //              type="text"
    //              id="input_config"
    //              value={input}
    //              onChange={(e) => setInput(e.target.value)}
    //            />
    //            <label htmlFor="process_config">Process Configuration:</label>
    //            <input
    //              id="process_config"
    //              value={process}
    //              onChange={(e) => setProcess(e.target.value)}
    //            />
    //            <button id="send_input_and_process" onClick={onClick}>
    //              Go
    //            </button>
    //          </div>
    //        </div>
    //      </div>
    //    </div>
  );
};
export default App;
