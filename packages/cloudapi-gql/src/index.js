const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

app.use('/graphql', require('./endpoint'));

const server = app.listen(4000, err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw err;
  }

  // eslint-disable-next-line no-console
  console.log(`Listening at http://0.0.0.0:${server.address().port}/graphql`);
});
