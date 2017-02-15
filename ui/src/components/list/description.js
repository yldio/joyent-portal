const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');
const Title = require('./title');

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled,
  css
} = Styled;

const margin = (props) => props.collapsed ? `
  margin-left: auto;
` : '';

const justify = (props) => props.collapsed
  ? 'flex-end'
  : 'flex-start';

const xs = (props) => props.collapsed
  ? 6
  : 12;

const collapsed = (...args) => (props) => !props.collapsed
  ? css(...args)
  : css``;

const StyledTitle = styled(Title)`
  ${collapsed`
    position: absolute;
    bottom: 0;
    padding-bottom: ${remcalc(12)};
    padding-top: 0;
  `}

  font-weight: normal !important;
  flex-grow: 2;
`;

const InnerDescription = styled.div`
  ${margin}
  justify-content: ${justify};
`;

const Description = (props) => (
  <StyledTitle
    collapsed={props.collapsed}
    name='list-item-description'
    xs={xs(props)}
  >
    <InnerDescription collapsed={props.collapsed}>
      {props.children}
    </InnerDescription>
  </StyledTitle>
);

Description.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

module.exports = Baseline(
  Description
);
