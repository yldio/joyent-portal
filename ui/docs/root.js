const React = require('react');
const ReactHotLoader = require('react-hot-loader');
const Button = require('../src/components/grid/readme.md');
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
