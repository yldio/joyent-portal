import { colors } from '../../shared/constants';
import { typography } from '../../shared/composers';
import styled from 'styled-components';
import global from './global';

export default styled.div`
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${colors.base.background};
  color: ${colors.base.text};

  ${typography.libreFranklin}
  ${typography.normal}
`;

export {
  global
};
