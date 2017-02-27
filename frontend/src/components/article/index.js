import styled from 'styled-components';
import { breakpoints, colors } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';

// Main content Wrapper Styles
export default styled.article`
  padding: 2rem;
  // border-top: ${remcalc(1)} solid ${colors.base.grey};

  ${breakpoints.large`
    padding: 0;
  `}
`;
