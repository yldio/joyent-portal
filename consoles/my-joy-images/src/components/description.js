import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import styled from 'styled-components';
import { P as BaseP } from 'joyent-ui-toolkit';

const P = styled(BaseP)`
  margin: 0;
`;

export default ({ children }) => (
  <Row>
    <Col xs={12} sm={8}>
      <Margin bottom={3}>
        <P>{children}</P>
      </Margin>
    </Col>
  </Row>
);
