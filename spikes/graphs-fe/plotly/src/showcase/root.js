const React = require('react');
const ReactHotLoader = require('react-hot-loader');

const {
  Button,
  Container,
  Base,
  PlotlyGraph
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
          <PlotlyGraph />
        </Container>
      </Base>
    </AppContainer>
  );
};
