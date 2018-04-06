module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'ui-toolkit',
        'icons',
        'instances',
        'navigation',
        'bundle',
        'images',
        'sg',
        'templates'
      ]
    ]
  }
};
