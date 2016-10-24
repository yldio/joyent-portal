const qs = require('querystring');
const ReactIntl = require('react-intl');

const {
  addLocaleData
} = ReactIntl;

module.exports = (({
  Locales = {},
  ReactIntlLocaleData = {}
}) => {
  const en = Locales['en-us'] || {};

  Object.keys(ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(ReactIntlLocaleData[lang] || []);
  });

  // http://stackoverflow.com/a/38150585
  const detectedLocale = (
    qs.parse((document.location.search || '').replace(/^\?/, '')).locale ||
    navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language ||   // All browsers
    navigator.userLanguage || // IE <= 10
    'en-US'
  ).toLowerCase();

  const lang = detectedLocale.split(/\-/)[0];
  const locale = ReactIntlLocaleData[lang]
    ? (Locales[detectedLocale] ? detectedLocale : 'en-us')
    : 'en-us';

  return {
    locale,
    messages: {
      ...en,
      ...(Locales[locale] || {})
    }
  };
})(window);
