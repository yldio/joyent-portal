import React from 'react';
import { P as BaseP } from 'joyent-ui-toolkit';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled from 'styled-components';
import { Anchor } from 'joyent-ui-toolkit';
import { Link } from 'react-router-dom';

const P = styled(BaseP)`
  font-weight: 200;
`;

export default ({ href = '', children }) => (
  <Row>
    <Col xs={12} sm={7}>
      <P>
        {children}{' '}
        {href ? (
          <Anchor>
            <Link target="__blank" to={href} rel="noopener noreferrer">
              Read the docs
            </Link>
          </Anchor>
        ) : null}
      </P>
    </Col>
  </Row>
);
