const express = require('express');
const cors = require('cors');

// initialize express application
const app = express();
// ensure that application uses CORS
app.use(cors());

// setup application port
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`);
});
