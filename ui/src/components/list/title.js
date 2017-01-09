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
  default: styled
} = Styled;

const justify = (props) => props.collapsed ? 'center' : 'flex-start';
const width = (props) => props.collapsed ? 'auto' : '100%';
const direction = (props) => props.collapsed ? 'column' : 'row';
const grow = (props) => props.collapsed ? 0 : 2;
const xs = (props) => props.collapsed ? 6 : 12;

const Container = styled.div`
  font-size: ${remcalc(16)};
  font-weight: 600;
  line-height: 1.5;
  color: ${colors.brandSecondaryColor};

  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};

  flex-grow: ${grow};
  width: ${width};

  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Span = styled.span`
  display: flex;
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

module.exports = Title;
