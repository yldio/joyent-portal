const AccountType = require('../types/login');
const api = require('../../api');

module.exports = {
  type: AccountType,
  resolve() {
    return api.account.get().then(account => {
      return Object.assign(account, {
        isUser: false
      });
    });
  }
};
