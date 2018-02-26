import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';

import Container from '../layout/view-container';

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Container {...rest}>
    <Margin top={4}>
      <Row name="breadcrum">
        <Col xs={12}>{children}</Col>
      </Row>
    </Margin>
  </Container>
);

export { default as Item } from './item';
