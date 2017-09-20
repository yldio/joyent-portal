const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

const app = express();

app.use(cors());
app.options('*', cors());

app.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.get(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const server = app.listen(4000, err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw err;
  }

  // eslint-disable-next-line no-console
  console.log(`Listening at http://0.0.0.0:${server.address().port}/graphql`);
});
