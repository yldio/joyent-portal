const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledLink = styled.a`
  text-decoration: underline;
`;

const Link = ({
  children,
  href
}) => (
  <StyledLink href={href} name='add-metric-link'>
    {children}
  </StyledLink>
);

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string.isRequired
};

module.exports = Link;
