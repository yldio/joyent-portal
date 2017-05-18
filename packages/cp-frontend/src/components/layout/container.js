import styled from 'styled-components';
import { Grid } from 'react-styled-flexboxgrid';

import { breakpoints } from 'joyent-ui-toolkit';

export default styled(Grid)`
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;
