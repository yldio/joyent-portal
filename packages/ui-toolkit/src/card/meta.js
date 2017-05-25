import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Subscriber } from 'react-broadcast';
import Baseline from '../baseline';
import is from 'styled-is';
import remcalc from 'remcalc';
import PropTypes from 'prop-types';
import View from './view';
import React from 'react';

const InnerRow = Row.extend`
  display: block;
  height: 100%;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${is('collapsed')`
    width: 100%;
    display: flex;
    padding-right: ${remcalc(47)};
  `};
`;

const Meta = ({ children, ...rest }) => {
  const render = ({
    collapsed = false,
    fromHeader = false,
    headed = false
  }) => {
    const meta = (
      <Col
        name="card-meta"
        xs={collapsed ? 12 : 6}
        collapsed={collapsed}
        fromHeader={fromHeader}
        headed={headed}
        {...rest}
      >
        <InnerRow collapsed={collapsed}>
          {children}
        </InnerRow>
      </Col>
    );

    return fromHeader
      ? <View collapsed fromHeader>
          {meta}
        </View>
      : meta;
  };

  return (
    <Subscriber channel="card">
      {render}
    </Subscriber>
  );
};

Meta.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  fromHeader: PropTypes.bool,
  headed: PropTypes.bool
};

export default Baseline(Meta);
