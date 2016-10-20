const express = require('express');

const app = express();

app.use('/graphql', require('./endpoint'));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log('Listening at localhost:3000');
});
