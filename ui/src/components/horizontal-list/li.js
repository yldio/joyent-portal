import { Baseline } from '../../shared/composers';
import { remcalc } from '../../shared/functions';
import { colors } from '../../shared/constants';
import styled from 'styled-components';

const Li = styled.li`
  display: inline-block;

  & + & {
    margin-left: ${remcalc(24)};
  }

  & a {
    color: ${colors.base.text};
    text-decoration: none;
    padding-bottom: ${remcalc(6)};

    &.active {
      cursor: default;
      color: ${colors.base.primary};
      border-bottom: 2px solid ${colors.base.primary};
    }
  }
`;

export default Baseline(
  Li
);
