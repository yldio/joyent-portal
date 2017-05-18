const ReactDOM = require('react-dom');
const React = require('react');
const store = require('./store')();

const render = () => {
  const Root = require('./root');

  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./root', render);
}
