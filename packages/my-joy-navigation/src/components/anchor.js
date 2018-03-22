import emotion from 'preact-emotion';

export default emotion('a')`
  font-weight: 600;
  line-height: 24px;
  font-size: 15px;
  text-decoration: none;
  color: ${props => props.theme.text};

  &:hover {
    color: ${props => props.theme.primary}
  }
`;
