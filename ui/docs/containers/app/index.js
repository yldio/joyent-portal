/* - TOOD: Use our own grid
 */

const React = require('react');
const ReactRouter = require('react-router');

const Navigation = require('./navigation.js');
const Home = require('../home');
const Item = require('../item/');

const {
  Base,
  Container,
  Row,
  Column
} = require('../../../src');

const {
  Match
} = ReactRouter;

module.exports = () => {
  return (
    <Base>
      <Container fluid>
        <Row>
          <Column xs={12} md={2}>
            <Navigation />
          </Column>
          <Column xs={12} md={10}>
            <Match
              component={Home}
              exactly
              pattern='/'
            />
            <Match
              component={Item}
              pattern='/:parent?/:name'
            />
          </Column>
        </Row>
      </Container>
    </Base>
  );
};
