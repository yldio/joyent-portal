const Collapsed = require('./collapsed');
const Column = require('../column');
const Styled = require('styled-components');
const React = require('react');
const Row = require('../row');

const {
  default: styled
} = Styled;

const xs = (props) => props.collapsed ? 12 : 6;

const InnerRow = styled(Row)`
  height: 100%;
`;

module.exports = Collapsed((props) => (
  <Column
    name='list-item-meta'
    xs={xs(props)}
    {...props}
  >
    <InnerRow>
      {props.children}
    </InnerRow>
  </Column>
));
