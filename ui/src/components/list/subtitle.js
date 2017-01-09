const constants = require('../../shared/constants');
const Title = require('./title');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const color = (props) => props.fromHeader
  ? colors.brandPrimaryColor
  : '#646464';

const Span = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-size: 14px;
  color: ${color};
`;

const Subtitle = (props) => (
  <Title name='list-item-subtitle' {...props}>
    <Span
      fromHeader={props.fromHeader}
    >
      {props.children}
    </Span>
  </Title>
);

Subtitle.propTypes = {
  children: React.PropTypes.node,
  fromHeader: React.PropTypes.bool
};

module.exports = Subtitle;