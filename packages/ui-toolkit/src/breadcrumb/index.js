import React from 'react';
import { Row } from 'react-styled-flexboxgrid';

/**
 * @example ./usage.md
 */
export default ({ children, ...rest }) => (
  <Row name="breadcrum" {...rest}>
    {children}
  </Row>
);

export { default as Item } from './item';
