import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Padding } from 'styled-components-spacing';
import remcalc from 'remcalc';

import Container from '../layout/view-container';

const BreadcrumContianer = styled(Container)`
  border-bottom: ${remcalc(1)} solid ${props => props.theme.grey};
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <BreadcrumContianer {...rest} fluid>
    <Padding top={1} bottom={1}>
      <Container>
        <Row name="breadcrum">
          <Col xs={12}>{children}</Col>
        </Row>
      </Container>
    </Padding>
  </BreadcrumContianer>
);

export { default as Item } from './item';
