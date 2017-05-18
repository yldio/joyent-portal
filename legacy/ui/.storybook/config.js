const React = require('react');
const { configure, addDecorator } = require('@kadira/storybook');

const req = require.context('../src/components', true, /.+?(?=story.js$)/);

const Styled = require('styled-components');
const Base = require('../src/components/base').default;

const {
  injectGlobal,
  default: styled
} = Styled;

const StyledBase = styled(Base)`
  height: 100%;
  padding: 8px;
`;

class StyledDecorator extends React.Component {
  componentWillMount() {
    injectGlobal`
      ${Base.global}

      html, body, #root {
        height: 100%;
        margin: 0;
      }
    `;
  }
  render() {
    return (
      <StyledBase>
        {this.props.children}
      </StyledBase>
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
}

configure(loadStories, module);
