const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const fns = require('../../shared/functions');
const isString = require('lodash.isstring');
const Styled = require('styled-components');
const React = require('react');

const {
  colors
} = constants;

const {
  remcalc
} = fns;

const {
  Baseline
} = composers;

const {
  default: styled
} = Styled;

const color = (props) => !props.fromHeader
  ? colors.base.secondary
  : colors.base.primary;

const padding = (props) => !props.collapsed
  ? `${remcalc(12)} ${remcalc(18)} 0 ${remcalc(18)}`
  : `0 ${remcalc(18)}`;

const justify = (props) => props.collapsed
  ? 'center'
  : 'flex-start';

const width = (props) => props.collapsed
  ? 'auto'
  : '100%';

const direction = (props) => props.collapsed
  ? 'column'
  : 'row';

const grow = (props) => props.collapsed
  ? 0
  : 2;

const xs = (props) => props.collapsed
  ? 6
  : 12;

const Container = styled.div`
  font-size: ${remcalc(16)};
  font-weight: 600;
  line-height: 1.5;
  color: ${color};

  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};

  flex-grow: ${grow};
  width: ${width};

  padding: ${padding};
`;

const display = (props) => !props.collapsed
  ? 'inline-block'
  : 'flex';

const Span = styled.span`
  display: ${display};
  flex-direction: column;
  justify-content: center;
`;

const Title = (props) => {
  const _children = !isString(props.children) ? props.children : (
    <Span>{props.children}</Span>
  );

  return (
    <Container
      collapsed={props.collapsed}
      name='list-item-title'
      xs={xs(props)}
      {...props}
    >
      {_children}
    </Container>
  );
};

Title.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool
};

module.exports = Baseline(
  Title
);
