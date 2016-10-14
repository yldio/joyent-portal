const request = require('./request');

module.exports = {
  user: {
    list: (ctx) => {
      return request('listUserKeys', ctx);
    },
    get: (ctx) => {
      return request('getUserKey', ctx);
    },
    create: (ctx) => {
      return request('createUserKey', ctx);
    },
    destroy: (ctx) => {
      return request('deleteUserKey', ctx);
    }
  },
  account: {
    list: () => {
      return request('listKeys', {});
    },

    get: (ctx) => {
      return request('getKey', ctx);
    },

    create: (ctx) => {
      return request('createKey', ctx);
    },

    destroy: (ctx) => {
      return request('deleteKey', ctx);
    }
  }
};
