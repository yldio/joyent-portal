import { is } from '../../shared/functions';
import { colors } from '../../shared/constants';
import { Baseline } from '../../shared/composers';
import { Link as BaseLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const style = css`
  color: ${colors.base.primary};

  ${is('secondary')`
    color: ${colors.base.white};
  `}
`;

const StyledAnchor = styled.a`
  ${style}
`;

const StyledLink = styled(BaseLink)`
  ${style}
`;

export default Baseline(
  StyledAnchor
);

export const Link = Baseline(
  StyledLink
);
