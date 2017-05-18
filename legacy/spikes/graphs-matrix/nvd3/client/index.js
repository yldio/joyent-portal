const ReactDOM = require('react-dom');
const React = require('react');
const Store = require('./store');
const nes = require('nes/dist/client');

const {
  Client
} = nes;

const client = new Client(`ws://${document.location.host}`);

client.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('connected');
});

const store = Store({
  ws: client,
  windowSize: 20
});

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
