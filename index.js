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

app.post('/execute', (req, res) => {
  res.send(execute(req.body.input, req.body.process));
});

app.post('/investigate', (req, res) => {
  console.log('POST request received.');
});

app.post('/randomize', (req, res) => {
  console.log('POST request received.');
});

app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`);
});

function execute(input, processes){
  let inputs = input.split(" ").map(Number)
  let processConfigs = processes.split(" ").map(Number)

  let cranePos = 0
  let isCarryingCrate = false

  for(let i = 0; i < processConfigs.length; i++){
      if(processConfigs[i] == 3){
          if(inputs[cranePos] > 0 && !isCarryingCrate){
              inputs[cranePos]-=1
              isCarryingCrate = true
          }
      }
      else if(processConfigs[i] == 4){
          if(inputs[cranePos] < 4 && isCarryingCrate){
              inputs[cranePos]+=1
              isCarryingCrate = false
          }
      }
      else if(processConfigs[i] == 1){
          if(cranePos > 0){
              cranePos-=1
          }
      }
      else if(processConfigs[i] == 2){
          if(cranePos < inputs.length - 1){
              cranePos+=1
          }
      }
      else if(processConfigs[i] == 0){
          break
      }
  }

  return inputs.map(String).join('')
}

function randomize(input){
  let inputs = input.split(" ").map(Number)
  console.log(inputs)

  let sum = inputs.reduce((acc,curr) => acc + curr)

  let list = new Array(inputs.length).fill(0)

  let a = 0
  let b = inputs.length

  while(sum > 0){
      let i = Math.floor(Math.random() * b)
      if(list[i] < 4){
          list[i]+=1
          sum-=1
      }
  }
  return list.map((String).join(''))
}
