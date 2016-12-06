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
} = require('@ui');

const {
  Match
} = ReactRouter;

const styles = {
  base: {
    backgroundColor: '#FFEBEE'
  },
  row: {
    backgroundColor: '#EF5350'
  },
  column: {
    backgroundColor: '#B71C1C',
    textAlign: 'center',
    color: 'white'
  }
};

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
            style={styles.base}
            md={10}
            sm={9}
            xs={12}
          >
            <Row style={styles.row} around>
              <Column style={styles.column} xs={1} sm={2} md={3} lg={4}>1</Column>
              <Column style={styles.column} xs={1} sm={2} md={3} lg={4}>2</Column>
              <Column style={styles.column} xs={1} sm={2} md={3} lg={4}>3</Column>
            </Row>
          </Column>
        </Row>
      </Container>
    </Base>
  );
};
