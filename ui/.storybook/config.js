const { configure } = require('@kadira/storybook');

const req = require.context('../src/components', true, /story.js$/)

function loadStories() {
  let stories = req.keys();
      stories = stories.sort();

  stories.forEach(story => req(story));

  // Fallback to stories/index.js file for anything that
  // hasn't been moved
  require('../stories');
}

configure(loadStories, module);
