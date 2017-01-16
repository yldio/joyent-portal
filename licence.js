module.exports = {
  allowedPackages: [
    {
      name: 'colors',
      extraFieldsForDocumentation: 'Licence is MIT, but was not found by tool: https://github.com/Marak/colors.js/blob/v0.5.1/MIT-LICENSE.txt', // optional
      date: '17 January 2017', // optional
      reason: 'MIT Licenced' // optional
    }
  ],
  allowedLicenses: [
    'CC-BY-4.0',
    'CC0-1.0',
    'MIT',
    'ISC',
    'Apache',
    'BSD',
    'WTF',
    'Public Domain',
    'MPL',
    'Unlicense'
  ]
};
