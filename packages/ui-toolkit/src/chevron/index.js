import is from 'styled-is';
import typography from '../typography';
import P from '../text/p';

export default P.extend`
  ${typography.fontFamily};

  display: inline-block;
  margin: 0;

  ${is('up')`
    transform: rotate(-90deg);
  `};

  ${is('down')`
    transform: rotate(90deg);
  `};

  ${is('left')`
    transform: rotate(180deg);
  `};

  &:before {
    content: '\\003e';
  }
`;
