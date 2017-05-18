const Store = require('./store');
const ReactDOM = require('react-dom');
const React = require('react');

const render = () => {
  const Root = require('./root');

  ReactDOM.render(
    <Root store={Store()} />,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./root', render);
}
