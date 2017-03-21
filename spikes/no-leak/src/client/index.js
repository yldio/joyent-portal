const ReactDOM = require('react-dom');
const React = require('react');
const Store = require('./store');
const nes = require('nes/dist/client');

const {
  Client
} = nes;

const client = new Client(`ws://${document.location.host}`);

const store = Store({
  windowSize: 20,
  ws: client
});

client.connect((err) => {
  if (err) {
    throw err;
  }

  store.getState().wsReady = true;

  render();
});

const render = () => {
  const Root = require('./root');

  if (!store.getState().wsReady) {
    return;
  }

  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  );
};

render();

if (module.hot) {
  module.hot.accept('./root', render);
}
