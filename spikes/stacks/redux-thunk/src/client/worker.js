const uuid = require('node-uuid');
const Emitter = require('component-emitter');
const crosstab = require('crosstab');
const values = require('lodash.values');
const actions = require('./actions');

const emitter = module.exports = new Emitter();
let isMaster = crosstab.util.tabs['MASTER_TAB'].id === crosstab.id;
const bridge = new Map();

const {
  updatePrinters
} = actions;

const handlers = {
  'PRINT': (action, fn) => {},
  'LOCK_PRINTER': (action, fn) => {
    fn();
  }
};

crosstab.util.events.on('message', ({
  data,
  origin
}) => {
  if (origin === crosstab.id) {
    return;
  }

  if (!data || !data.type) {
    return;
  }

  if (!data._id) {
    return emitter.emit('action', data);
  }

  const b = bridge.get(data._id);

  if (b) {
    data.error ? b.reject(new Error(data.error)) : b.resolve(data.payload);
    return bridge.delete(data._id);
  }

  if (!handlers[data.type]) {
    return emitter.emit('action', data);
  }

  handlers[data.type](data, (err, res) => {
    crosstab.broadcast('message', {
      ...data,
      error: err && err.message
    }, origin);
  });
});

crosstab.util.events.on(crosstab.util.eventTypes.becomeMaster, () => {
  isMaster = true;
});

crosstab.util.events.on(crosstab.util.eventTypes.demoteFromMaster, () => {
  isMaster = false;
});

const dispatch = module.exports.dispatch = (action, tab) => {
  if (isMaster && !tab) {
    if (handlers[action.type]) {
      return new Promise(function(resolve, reject) {
        handlers[action.type](action, function(err, res) {
          return err ? reject(err) : resolve(res);
        });
      });
    }
  }

  const id = uuid.v4();

  const then = new Promise((resolve, reject) => {
    bridge.set(id, {
      resolve,
      reject
    });
  });

  crosstab.broadcast('message', {
    ...action,
    _id: id
  }, tab);

  return then;
};

const printers = {
  '1': {
    id: '1',
    name: 'Main printer',
    lock: ''
  },
  '2': {
    id: '2',
    name: 'Handled printer',
    lock: ''
  }
};

emitter.emit('action', updateWorkerId(crosstab.id));

setInterval(() => {
  if (!isMaster) {
    return;
  }

  const action = updatePrinters(values(printers));

  emitter.emit('action', action);
  dispatch(action);
}, 500);
