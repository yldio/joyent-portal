import React from 'react';
import { withTheme } from 'emotion-theming';

import BaseDataCenter from 'joyent-icons/dist/es/data-center';
import BaseTriton from 'joyent-icons/dist/es/triton';
import BaseServices from 'joyent-icons/dist/es/services';

const Colors = Component =>
  withTheme(({ theme = {}, ...rest }) => (
    <Component {...rest} colors={theme} />
  ));

export const DataCenter = Colors(BaseDataCenter);
export const Services = Colors(BaseServices);
export const Triton = Colors(BaseTriton);
