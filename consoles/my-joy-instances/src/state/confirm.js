export default msg =>
  new Promise(resolve => {
    // eslint-disable-next-line no-alert
    resolve(window.confirm(msg));
  });
