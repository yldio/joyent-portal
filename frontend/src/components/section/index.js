const React = require('react');
const ReactIntl = require('react-intl');
const ReactRouter = require('react-router');

const H1 = require('@ui/components/h1');
const Li = require('@ui/components/horizontal-list/li');
const Ul = require('@ui/components/horizontal-list/ul');

const {
  FormattedMessage
} = ReactIntl;

const {
  Link
} = ReactRouter;

const Section = ({
  children,
  links = [],
  name = ''
}) => {
  const navLinks = links.map((link) => (
    <Li key={link.name}>
      <Link activeClassName='active' to={link.pathname}>
        <FormattedMessage id={link.name} />
      </Link>
    </Li>
  ));

  return (
    <div>
      <H1>{name}</H1>
      <Ul>
        {navLinks}
      </Ul>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      name: React.PropTypes.string,
      pathname: React.PropTypes.string
    })
  ),
  name: React.PropTypes.string
};

module.exports = Section;
