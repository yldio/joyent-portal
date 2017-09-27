import is from 'styled-is';
import P from '../text/p';

export default P.extend`
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
