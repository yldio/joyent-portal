const React = require('react');
const composers = require('../../shared/composers');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const {
  Baseline
} = composers;

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

module.exports = Baseline(
  Link
);
