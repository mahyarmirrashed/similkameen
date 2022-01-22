const express = require('express');
const cors = require('cors');

// initialize express application
const app = express();
// ensure that application uses CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup application port
const port = process.env.PORT || 4000;

const NUMBER_STRING_FORMAT = /^[0-9 ]*[0-9]$/;

app.post('/execute', (req, res) => {
  console.log('POST request to /execute received.');

  if (
    (typeof req.body.input === 'string' || req.body.input instanceof String) &&
    req.body.input.length > 0 &&
    req.body.input.match(NUMBER_STRING_FORMAT) &&
    (typeof req.body.process === 'string' ||
      req.body.process instanceof String) &&
    req.body.process.length > 0 &&
    req.body.process.match(/^[0-4 ]*0$/) &&
    Number.isInteger(req.body.height) &&
    req.body.height > 0
  ) {
    let input = req.body.input.trim().split(' ').map(Number);
    let process = req.body.process.trim().split(' ').map(Number);

    let pos = 0;
    let carrying = false;

    for (let i = 0; i < process.length; i += 1) {
      if (process[i] == 0) {
        // quit processing
        break;
      } else if (process[i] == 1 && pos > 0) {
        pos -= 1;
      } else if (process[i] == 2 && pos < input.length - 1) {
        pos += 1;
      } else if (process[i] == 3 && input[pos] > 0 && !carrying) {
        input[pos] -= 1;
        carrying = true;
      } else if (process[i] == 4 && input[pos] < req.body.height && carrying) {
        input[pos] += 1;
        carrying = false;
      }
    }

    res.send({ output: input.map(String).join(' ') });
  } else {
    res.send({ output: undefined });
  }

  console.log('POST request to /execute completed.');
});

app.post('/investigate', (req, res) => {
  console.log('POST request to /investigate received.');

  if (
    (typeof req.body.input === 'string' || req.body.input instanceof String) &&
    req.body.input.length > 0 &&
    req.body.input.match(NUMBER_STRING_FORMAT) &&
    (typeof req.body.output === 'string' ||
      req.body.output instanceof String) &&
    req.body.output.length > 0 &&
    req.body.output.match(NUMBER_STRING_FORMAT) &&
    req.body.input.length === req.body.output.length &&
    Number.isInteger(req.body.height) &&
    req.body.height > 0
  ) {
    let input = req.body.input.trim().split(' ').map(Number);
    let output = req.body.output.trim().split(' ').map(Number);

    let process = '';
    let i = 0;
    let pos = 0;

    if (
      input.reduce((acc, curr) => acc + curr) ==
      output.reduce((acc, curr) => acc + curr)
    ) {
      while (i < input.length) {
        while (input[i] !== output[i]) {
          // defensive programming practices prevent out of bound accesses
          pos = i + 1;

          if (input[i] < output[i]) {
            // accept from right
            while (output[pos] === 0 || input[pos] === output[pos]) {
              pos += 1;
            }

            process += '2'.repeat(pos - i) + '3' + '1'.repeat(pos - i) + '4';

            input[i] += 1;
            input[pos] -= 1;
          } else {
            // donate to right
            while (
              output[pos] === req.body.height ||
              input[pos] === output[pos]
            ) {
              pos += 1;
            }

            process += '3' + '2'.repeat(pos - i) + '4' + '1'.repeat(pos - i);

            input[i] -= 1;
            input[pos] += 1;
          }
        }

        // increment to next pair of stacks
        i += 1;
        process += '2';
      }

      res.send({ process: process.replace(/[123]+$/, '') + '0' });
    } else {
      res.send({ process: undefined });
    }
  } else {
    res.send({ process: undefined });
  }

  console.log('POST request to /investigate completed.');
});

app.post('/randomize', (req, res) => {
  console.log('POST request to /randomize received.');

  if (
    (typeof req.body.input === 'string' || req.body.input instanceof String) &&
    req.body.input.length > 0 &&
    req.body.input.match(NUMBER_STRING_FORMAT) &&
    Number.isInteger(req.body.height) &&
    req.body.height > 0
  ) {
    let input = req.body.input.trim().split(' ').map(Number);
    let tot = input.reduce((acc, curr) => acc + curr);
    let out = new Array(input.length).fill(0);

    while (tot > 0) {
      let i = Math.floor(Math.random() * input.length);
      if (out[i] < req.body.height) {
        out[i] += 1;
        tot -= 1;
      }
    }

    res.send({ output: out.join(' ') });
  } else {
    res.send({ output: undefined });
  }

  console.log('POST request to /randomize completed.');
});

app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`);
});
