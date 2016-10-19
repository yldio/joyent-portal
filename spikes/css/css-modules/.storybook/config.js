const Storybook = require('@kadira/storybook');

Storybook.configure(() => {
  require('../stories');
}, module);
