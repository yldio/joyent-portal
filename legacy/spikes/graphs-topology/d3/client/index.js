const ReactDOM = require('react-dom');
const React = require('react');
const store = require('./store')();
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

  client.subscribe('/stats/5', (update, flag) => {
    store.dispatch({
      type: 'UPDATE_STATS',
      payload: update
    })
  }, (err) => {
    if (err) {
      throw err;
    }

    console.log('subscribed');
  });
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
