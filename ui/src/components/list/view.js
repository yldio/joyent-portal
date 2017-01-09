const Collapsed = require('./collapsed');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const View = styled(Row)`
  flex: 1;
  margin: 0;
  height: 100%;
`;

module.exports = Collapsed((props) => (
  <View name='list-item-view' {...props}>
    {props.children}
  </View>
));
