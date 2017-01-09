const Title = require('./title');
const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const Span = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-size: 14px;
  color: #646464;
`;

const Subtitle = (props) => (
  <Title name='list-item-subtitle' {...props}>
    <Span>
      {props.children}
    </Span>
  </Title>
);

Subtitle.propTypes = {
  children: React.PropTypes.node
};

module.exports = Subtitle;