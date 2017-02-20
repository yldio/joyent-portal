import styled from 'styled-components';
import { colors, breakpoints } from '@ui/shared/constants';

// Main Contonent Wrapper Styles
export default styled.article`
  background-color: ${colors.base.grey};
  padding: 2rem;

  ${breakpoints.large`
    padding: 0;
  `}
`;
