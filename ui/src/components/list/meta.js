const Column = require('../column');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('./transfer-props');
const View = require('./view');

const {
  default: styled
} = Styled;

const xs = (props) => props.collapsed ? 12 : 6;

const InnerRow = styled(Row)`
  height: 100%;
`;

module.exports = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], (props) => {
  const meta = (
    <Column
      name='list-item-meta'
      xs={xs(props)}
      {...props}
    >
      <InnerRow>
        {props.children}
      </InnerRow>
    </Column>
  );

  return !props.fromHeader ? meta : (
    <View collapsed fromHeader>
      {meta}
    </View>
  );
});
