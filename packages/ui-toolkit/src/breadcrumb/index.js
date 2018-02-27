import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Padding } from 'styled-components-spacing';

import Container from '../layout/view-container';

const BreadcrumContianer = styled(Container)`
  border-bottom: 1px solid ${props => props.theme.grey};
`;

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <BreadcrumContianer {...rest} fluid>
    <Padding top={2} bottom={2}>
      <Container>
        <Row name="breadcrum">
          <Col xs={12}>{children}</Col>
        </Row>
      </Container>
    </Padding>
  </BreadcrumContianer>
);

export { default as Item } from './item';
