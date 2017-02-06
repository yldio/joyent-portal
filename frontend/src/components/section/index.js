const React = require('react');
const ReactIntl = require('react-intl');
const ReactRouter = require('react-router-dom');
const Styled = require('styled-components');

const Li = require('@ui/components/horizontal-list/li');
const constants = require('@ui/shared/constants');
const PropTypes = require('@root/prop-types');
const Ul = require('@ui/components/horizontal-list/ul');
const Breadcrumb = require('@components/breadcrumb');

const {
  default: styled
} = Styled;

const {
  FormattedMessage
} = ReactIntl;

const {
  NavLink
} = ReactRouter;

const {
  breakpoints,
} = constants;

const StyledHorizontalList = styled(Ul)`
  padding: 0;
`;

const StyledHorizontalListItem = styled(Li)`
  ${breakpoints.smallOnly`
    display: block;
  `}
`;

const Section = (props) => {
  const {
    children,
    links = [],
  } = props;

  const navLinks = links.map((link) => (
    <StyledHorizontalListItem key={link.name}>
      <NavLink activeClassName='active' to={link.pathname}>
        <FormattedMessage id={link.name} />
      </NavLink>
    </StyledHorizontalListItem>
  ));

  return (
    <div>
      <Breadcrumb {...props} />
      <StyledHorizontalList name="project-nav">
        {navLinks}
      </StyledHorizontalList>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link)
};

module.exports = Section;
