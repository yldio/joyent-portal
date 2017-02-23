import styled from 'styled-components';
import { colors, breakpoints } from '@ui/shared/constants';
import { unitcalc } from '@ui/shared/functions';

// Main Contonent Wrapper Styles
export default styled.article`
  background-color: ${colors.base.background};
  padding: ${unitcalc(1)};

  ${breakpoints.large`
    padding: 0;
  `}
`;
