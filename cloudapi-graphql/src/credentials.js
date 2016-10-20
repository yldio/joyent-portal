const json = (() => {
  try {
    return require('../credentials.json');
  } catch (err) {
    return {};
  }
})();

module.exports = {
  url: process.env.SDC_URL || json.url || '',
  account: process.env.SDC_ACCOUNT || json.account || '',
  user: process.env.SDC_USER || json.user || '',
  keyId: process.env.SDC_KEY_ID || json.keyId || ''
};
