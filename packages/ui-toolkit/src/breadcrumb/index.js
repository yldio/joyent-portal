import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';

import Container from '../layout/view-container';

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Container {...rest} fluid>
    <Row name="breadcrum">
      <Col xs={12}>{children}</Col>
    </Row>
  </Container>
);

export { default as Item } from './item';
