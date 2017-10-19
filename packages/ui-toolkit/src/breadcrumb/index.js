import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

import View from '../layout/view-container';

/**
 * @example ./usage.md
 */
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
