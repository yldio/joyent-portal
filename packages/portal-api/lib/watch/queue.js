'use strict';

const Throat = require('throat');

module.exports = (() => {
  const _queues = {};

  // pushToQueue
  return (id, cb) => {
    if (_queues[id]) {
      _queues[id](cb);
      return;
    }

    _queues[id] = Throat(1);
    _queues[id](cb);
  };
})();
