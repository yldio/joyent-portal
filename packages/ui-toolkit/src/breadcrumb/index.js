import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import View from '../layout/view-container';

const Border = styled.div`
  border-bottom: solid ${remcalc(1)} ${props => props.theme.grey};
`;

export default ({ children, ...rest }) => (
  <Border {...rest}>
    <View>
      <Row name="breadcrum">
        <Col xs={12}>{children}</Col>
      </Row>
    </View>
  </Border>
);

export { default as Item } from './item';
