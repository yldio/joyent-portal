const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const Title = require('./title');
const React = require('react');
const Styled = require('styled-components');

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const padding = (props) => !props.collapsed
  ? `0 ${remcalc(18)}`
  : 0;

const display = (props) => !props.collapsed
  ? 'inline-block'
  : 'flex';

const Span = styled.span`
  display: ${display};
  flex-direction: column;

  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  font-size: ${remcalc(14)};

  justify-content: flex-end;
`;

const StyledTitle = styled(Title)`
  display: ${display};
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

module.exports = Baseline(
  Subtitle
);
