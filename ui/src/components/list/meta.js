import styled from 'styled-components';
import { Subscriber } from 'react-broadcast';
import { Baseline } from '../../shared/composers';
import { is, isNot } from '../../shared/functions';
import Column from '../column';
import Row from '../row';
import View from './view';
import React from 'react';

const InnerRow = styled(Row)`
  display: block;
  height: 100%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${is('collapsed')`
    display: flex;
  `};
`;

const Meta = ({
  children,
  ...props
}) => {
  const render = ({
    collapsed = false,
    fromHeader = false,
    headed = false
  }) => {
    const meta = (
      <Column
        name='list-item-meta'
        xs={collapsed ? 12 : 6}
        collapsed={collapsed}
        fromHeader={fromHeader}
        headed={headed}
        {...props}
      >
        <InnerRow collapsed={collapsed}>
          {children}
        </InnerRow>
      </Column>
    );

    return !fromHeader ? meta : (
      <View collapsed fromHeader>
        {meta}
      </View>
    );
  };

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Meta.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool,
  headed: React.PropTypes.bool
};

export default Baseline(
  Meta
);
