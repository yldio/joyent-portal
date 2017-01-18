const flatten = require('lodash.flatten');
const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');
const ReactRouter = require('react-router');

const H1 = require('@ui/components/base-elements').H1;
const Li = require('@ui/components/horizontal-list/li');
const PropTypes = require('@root/prop-types');
const Ul = require('@ui/components/horizontal-list/ul');
const fns = require('@ui/shared/functions');

const {
  default: styled
} = Styled;

const BreadcrumbA = styled.a`
  text-decoration: none !important;
`;

const BreadcrumbSpan = styled.span`
  color: #646464;
`;

const {
  remcalc
} = fns;

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
    if (!part.name) {
      return null;
    }

    const link = (
      <Link key={part.pathname} to={part.pathname}>
        {
          ({
            href,
            onClick,
          }) =>
            <BreadcrumbA href={href} onClick={onClick}>
              {part.name}
            </BreadcrumbA>
        }
      </Link>
    );

    const slash = (
      <BreadcrumbSpan key={`${part.pathname}${i}`}> / </BreadcrumbSpan>
    );

    return (i === 0) ? link : [
      slash,
      link
    ];
  }));

  return (
    <div>
      <H1
        style={{
          fontSize: remcalc(24)
        }}
      >
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
