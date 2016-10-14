module.exports = {
  ...require('./reducers/printers').actions,
  ...require('./reducers/changes').actions
};
