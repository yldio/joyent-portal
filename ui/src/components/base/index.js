import { colors } from '../../shared/constants';
import styled from 'styled-components';

import {
  libreFranklin,
  bodyColor,
  regular
} from '../../shared/composers/typography';

export default styled.div`
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${colors.base.background};

  ${libreFranklin}
  ${bodyColor}
  ${regular}
`;
