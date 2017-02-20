import styled from 'styled-components';
import transferProps from '../../shared/transfer-props';
import { Baseline } from '../../shared/composers';
import { is } from '../../shared/functions';
import Column from '../column';
import Row from '../row';
import View from './view';
import React from 'react';

const md = (props) => props.collapsed
  ? 12
  : 6;

const InnerRow = styled(Row)`
  display: block;
  height: 100%;

  ${is('collapsed')`
    display: flex;
  `};
`;

const Meta = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], ({
  children,
  collapsed,
  ...props
}) => {
  const meta = (
    <Column
      md={md(props)}
      name='list-item-meta'
      xs={12}
      {...props}
    >
      <InnerRow collapsed={collapsed}>
        {children}
      </InnerRow>
    </Column>
  );

  return !props.fromHeader ? meta : (
    <View collapsed fromHeader>
      {meta}
    </View>
  );
});

export default Baseline(
  Meta
);
