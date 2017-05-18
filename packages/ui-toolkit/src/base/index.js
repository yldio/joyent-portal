import typography from '../typography';
import styled from 'styled-components';
import global from './global';

export default styled.div`
  ${typography.fontFamily};
  ${typography.normal};

  font-size: 1rem;
  line-height: 1.5;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

export { global };
