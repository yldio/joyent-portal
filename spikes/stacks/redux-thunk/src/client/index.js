const worker = require('./worker'); // singleton

const React = require('react');
const ReactDOM = require('react-dom');

const render = () => {
  const Root = require('./root');

  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./root', render);
}