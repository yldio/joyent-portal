const React = require('react');
const ReactHotLoader = require('react-hot-loader');

const {
  Button,
  Container,
  Base,
  Graph
} = require('../');

const {
  AppContainer
} = ReactHotLoader;

module.exports = () => {
  return (
    <AppContainer>
      <Base>
        <Container>
          <p>Hello</p>
          <Graph />
        </Container>
      </Base>
    </AppContainer>
  );
};
