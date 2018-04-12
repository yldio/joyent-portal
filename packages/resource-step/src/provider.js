import React, { Fragment } from 'react';
import { Broadcast } from 'joy-react-broadcast';

export default ({ children, ...props }) => (
  <Broadcast channel="create-resource-group" value={props}>
    <Fragment>{children}</Fragment>
  </Broadcast>
);
