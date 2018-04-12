import React from 'react';
import { P as BaseP } from 'joyent-ui-toolkit';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled from 'styled-components';

const P = styled(BaseP)`
  font-weight: 200;
`;

export default ({ href = '', children }) => (
  <Row>
    <Col xs={12} sm={7}>
      <P>
        {children}{' '}
        {href ? (
          <a target="__blank" href={href} rel="noopener noreferrer">
            Read the docs
          </a>
        ) : null}
      </P>
    </Col>
  </Row>
);
