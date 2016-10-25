const React = require('react');
const ReactRouter = require('react-router');

const Navigation = require('./navigation.js');
const Home = require('../home');
const Item = require('../item/');

const {
  Base
} = require('../../../src');

const {
  Match
} = ReactRouter;

module.exports = () => {
  return (
    <Base>
      <Navigation />
      <Match
        component={Home}
        exactly
        pattern='/'
      />
      <Match
        component={Item}
        pattern='/:parent?/:name'
      />
    </Base>
  );
};
