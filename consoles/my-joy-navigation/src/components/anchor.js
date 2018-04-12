import emotion from 'preact-emotion';
import remcalc from 'remcalc';

export default emotion('a')`
  font-weight: 600;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};
  text-decoration: none;
  color: ${props => props.theme.text};

  &:hover {
    color: ${props => props.theme.primary}
  }
`;
