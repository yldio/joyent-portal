import React from 'react';
import { Baseline } from '../../shared/composers';
import { default as FullView } from './full/view';
import { default as MiniView } from './mini/view';

const View = ({
  children,
  mini,
  ...props
}) => mini ? (
  <MiniView {...props}>
    {children}
  </MiniView>
) : (
  <FullView {...props}>
    {children}
  </FullView>
);

View.propTypes = {
  children: React.PropTypes.node,
  mini: React.PropTypes.bool
};

export default Baseline(
  View
);
