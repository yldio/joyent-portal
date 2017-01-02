const flatten = require('lodash.flatten');
const React = require('react');
const ReactIntl = require('react-intl');
const ReactRouter = require('react-router');

const H1 = require('@ui/components/h1');
const Li = require('@ui/components/horizontal-list/li');
const PropTypes = require('@root/prop-types');
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
  name = []
}) => {
  const navLinks = links.map((link) => (
    <Li key={link.name}>
      <Link activeClassName='active' to={link.pathname}>
        <FormattedMessage id={link.name} />
      </Link>
    </Li>
  ));

  const nameLinks = flatten(name.map((part, i) => {
    const link = (
      <Link key={part.pathname} to={part.pathname}>
        {part.name}
      </Link>
    );

    const slash = (
      <span key={`${part.pathname}${i}`}> / </span>
    );

    return (i === 0) ? link : [
      slash,
      link
    ];
  }));

  return (
    <div>
      <H1>
        {nameLinks}
      </H1>
      <Ul>
        {navLinks}
      </Ul>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link),
  name: React.PropTypes.arrayOf(PropTypes.link)
};

module.exports = Section;
