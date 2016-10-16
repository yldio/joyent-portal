module.exports = {
  ...require('./reducers/app').actions,
  ...require('./reducers/printers').actions,
  ...require('./reducers/changes').actions
};
