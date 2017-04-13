const express = require('express');

const app = express();

app.use('/graphql', require('./endpoint'));

const server = app.listen((err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log(`Listening at http://localhost:${server.address().port}`);
});
