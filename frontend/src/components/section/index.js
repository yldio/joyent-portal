const React = require('react');
const ReactIntl = require('react-intl');
const ReactRouter = require('react-router');

const Li = require('@ui/components/horizontal-list/li');
const PropTypes = require('@root/prop-types');
const Ul = require('@ui/components/horizontal-list/ul');
const Breadcrumb = require('@components/breadcrumb');

const {
  FormattedMessage
} = ReactIntl;

const {
  Link
} = ReactRouter;

const Section = (props) => {
  const {
    children,
    links = [],
  } = props;

  const navLinks = links.map((link) => (
    <Li key={link.name}>
      <Link activeClassName='active' to={link.pathname}>
        <FormattedMessage id={link.name} />
      </Link>
    </Li>
  ));

  return (
    <div>
      <Breadcrumb {...props} />
      <Ul>
        {navLinks}
      </Ul>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link)
};

module.exports = Section;
