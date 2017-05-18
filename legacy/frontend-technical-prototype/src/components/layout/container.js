import styled from 'styled-components';
import Container from '@ui/components/container';
import { breakpoints } from '@ui/shared/constants';

const LayoutContainer = styled(Container)`
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;

export default LayoutContainer;
