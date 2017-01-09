const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const Title = require('./title');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const padding = (props) => !props.collapsed
  ? `0 ${remcalc(18)}`
  : 0;

const color = (props) => props.fromHeader
  ? colors.brandPrimaryColor
  : '#646464';

const Span = styled.span`
  display: flex;
  flex-direction: column;

  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-size: 14px;
  color: ${color};

  justify-content: flex-end;
`;

const StyledTitle = styled(Title)`
  padding: ${padding};
`;

const Subtitle = (props) => (
  <StyledTitle name='list-item-subtitle' {...props}>
    <Span
      fromHeader={props.fromHeader}
    >
      {props.children}
    </Span>
  </StyledTitle>
);

Subtitle.propTypes = {
  children: React.PropTypes.node,
  fromHeader: React.PropTypes.bool
};

module.exports = Subtitle;