import { Grid } from 'react-styled-flexboxgrid';
import { breakpoints } from 'joyent-ui-toolkit';

export default Grid.extend`
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;
