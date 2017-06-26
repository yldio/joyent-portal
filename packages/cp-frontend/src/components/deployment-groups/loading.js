import React from 'react';
import { Col, Row } from 'react-styled-flexboxgrid';
import { Dots2 } from 'styled-text-spinners';

const LoadingRow = Row.extend`
  flex: 1 1 auto;
`;

export default () =>
  <LoadingRow center="xs" around="xs" middle="xs">
    <Col xs={1}>
      <Dots2 />
    </Col>
  </LoadingRow>;
