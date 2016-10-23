const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const Button = require('../src/button/readme.md');
const InnerHTML = require('dangerously-set-inner-html');

const {
  AppContainer
} = ReactHotLoader;

module.exports = () => {
  return (
    <AppContainer>
      <InnerHTML html={Button} />
    </AppContainer>
  );
};
