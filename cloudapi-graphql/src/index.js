const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP(() => ({
  schema: schema,
  graphiql: true,
  pretty: true
})));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log('Listening at localhost:3000');
});
