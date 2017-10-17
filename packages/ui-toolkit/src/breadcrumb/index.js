import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import View from '../layout/view-container';

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
