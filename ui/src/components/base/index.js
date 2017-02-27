import { colors } from '../../shared/constants';
import { libreFranklin, bodyColor, regular } from '../../shared/composers';
import styled from 'styled-components';
import global from './global';

export default styled.div`
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${colors.base.background};

  ${libreFranklin}
  ${bodyColor}
  ${regular}
`;

export {
  global
};
