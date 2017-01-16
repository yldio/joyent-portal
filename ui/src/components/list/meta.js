const Column = require('../column');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('../../shared/transfer-props');
const View = require('./view');

const {
  default: styled
} = Styled;

const xs = (props) => props.collapsed
  ? 12
  : 6;

const display = (props) => !props.collapsed
  ? 'block'
  : 'flex';

const InnerRow = styled(Row)`
  display: ${display};
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
      <InnerRow collapsed={props.collapsed}>
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
