import styled from 'styled-components';
import { breakpoints } from '@ui/shared/constants';

// Main Contonent Wrapper Styles
export default styled.article`
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;
