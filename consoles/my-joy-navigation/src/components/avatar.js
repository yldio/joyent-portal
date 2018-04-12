import React from 'react';
import emotion from 'preact-emotion';
import remcalc from 'remcalc';

const Img = emotion('img')`
  width: ${remcalc(24)};
  border-radius: 50%;
`;

export default props => <Img {...props} />;
