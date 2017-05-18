const React = require('react');
const ReactHotLoader = require('react-hot-loader');

const {
  Button,
  Container,
  Base
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
          <Button>Hello</Button>
        </Container>
      </Base>
    </AppContainer>
  );
};
