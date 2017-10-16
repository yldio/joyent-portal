import React from 'react';
import forceArray from 'force-array';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';

import View from '../layout/view-container';
import Breadcrumb from './index';
import Item from './item';

export default ({ children, ...rest }) => (
  <div {...rest}>
    <View>
      <Row name="breadcrum">
        <Col xs={12}>{children}</Col>
      </Row>
    </View>
  </div>
);

export { default as Item } from './item';
