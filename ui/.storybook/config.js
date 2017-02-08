const React = require('react');
const { configure, addDecorator } = require('@kadira/storybook');

const req = require.context('../src/components', true, /story.js$/);

const Styled = require('styled-components');
const Base = require('../src/components/base');

const {
  injectGlobal
} = Styled;

class StyledDecorator extends React.Component {
  componentWillMount() {
    injectGlobal`
      ${Base.global}
    `;
  }
  render() {
    return (
      <Base>
        {this.props.children}
      </Base>
    )
  }
}

addDecorator((story) => (
  <StyledDecorator>
    {story()}
  </StyledDecorator>
));

function loadStories() {
  let stories = req.keys();
      stories = stories.sort();

  stories.forEach(story => req(story));

  // Fallback to stories/index.js file for anything that
  // hasn't been moved
  require('../stories');
}

configure(loadStories, module);
