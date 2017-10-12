module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['ui-toolkit', 'my-joyent', 'my-joy-beta', 'boilerplate', 'cloudapi-gql']
    ]
  }
};
