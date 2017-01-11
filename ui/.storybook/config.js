const { configure } = require('@kadira/storybook');

const req = require.context('../src/components', true, /story.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename));
  require('../stories');
}

configure(loadStories, module);