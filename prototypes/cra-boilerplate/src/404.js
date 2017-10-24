import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme, H1, H2, H3 } from 'joyent-ui-toolkit';

const neon = keyframes`
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #f17, 0 0 70px #f17, 0 0 80px #f17, 0 0 100px #f17, 0 0 150px #f17;
  }

  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #f17, 0 0 35px #f17, 0 0 40px #f17, 0 0 50px #f17, 0 0 75px #f17;
  }
`;

const Title = styled(H1)`
  color: ${theme.white};
  font-family: 'Monoton';
  animation: ${neon} 1.5s ease-in-out infinite alternate;
  font-size: 7em;
  margin: 20px 0 40px;

  &:hover {
    animation: none;
    color: ${theme.red};
  }
`;

const Container = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(30, 30, 30);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.white};
  text-align: center;
`;

const Code = styled.code`
  font-family: 'Roboto Mono';
`;

const NotFound = ({ name, route }) => (
  <Container>
    <Title>Not Found</Title>
    <H2>
      URL: <Code> {window.location.href}</Code>
    </H2>
    <H2>
      Expected page: <Code>pages/{name}</Code>
    </H2>
    <H3>
      Expected export in <Code>src/routes.js</Code>: <br />
      <br />
      <br />
      <Code>{`export { default as ${route} } from './pages/${name}';`}</Code>
    </H3>
  </Container>
);

export default NotFound;
