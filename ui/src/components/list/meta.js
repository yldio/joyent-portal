const Column = require('../column');
const React = require('react');
const Row = require('../row');
const Styled = require('styled-components');
const transferProps = require('../../shared/transfer-props');
const View = require('./view');

const {
  default: styled
} = Styled;

const md = (props) => props.collapsed
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
      md={md(props)}
      name='list-item-meta'
      xs={12}
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
