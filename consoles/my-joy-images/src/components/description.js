import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import { P } from 'joyent-ui-toolkit';

export default ({ children }) => (
  <Row>
    <Col xs="12" sm="8">
      <Margin bottom="3">
        <P>{children}</P>
      </Margin>
    </Col>
  </Row>
);
