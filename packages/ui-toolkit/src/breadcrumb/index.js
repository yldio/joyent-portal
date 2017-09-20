import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Row name="breadcrum" {...rest}>
    <Col xs={12}>{children}</Col>
  </Row>
);

export { default as Item } from './item';
export { default as Container } from './container';
