import { css } from 'styled-components';

import screens from './screens';

const breakpoint = label => (...args) => css`
  @media ${screens[label]} {
    ${css(...args)};
  }
`;

export default Object.keys(screens).reduce(
  (sum, label) => ({
    ...sum,
    [label]: breakpoint(label)
  }),
  {}
);
