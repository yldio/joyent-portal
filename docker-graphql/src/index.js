const express = require('express');

const app = express();

app.use('/graphql', require('./endpoint'));

const server = app.listen(4010, err => {
  if (err) {
    console.error(err);
    throw err;
  }

  console.log(`Listening at http://0.0.0.0:${server.address().port}/graphql`);
});
