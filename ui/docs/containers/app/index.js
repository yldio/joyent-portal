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
          <Column
            md={2}
            sm={3}
            xs={12}
          >
            <Navigation />
          </Column>
          <Column
            md={10}
            sm={9}
            xs={12}
          >
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
