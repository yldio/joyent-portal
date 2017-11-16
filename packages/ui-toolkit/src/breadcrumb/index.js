import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';

import Container from '../layout/view-container';

const Root = Container.extend`
  border-bottom: ${remcalc(1)} solid ${props => props.theme.grey};
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Root {...rest} fluid>
    <Container>
      <Row name="breadcrum">
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  </Root>
);

export { default as Item } from './item';
