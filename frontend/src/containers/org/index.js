const isEmpty = require('lodash.isempty');
const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const selectors = require('@state/selectors');

const H1 = require('@ui/components/h1');
const Li = require('@ui/components/horizontal-list/li');
const Ul = require('@ui/components/horizontal-list/ul');
const NotFound = require('@containers/not-found');
const Redirect = require('@components/redirect');

const SectionComponents = {
  people: require('./people'),
  projects: require('./projects'),
  settings: require('./settings'),
};

const {
  FormattedMessage
} = ReactIntl;

const {
  connect
} = ReactRedux;

const {
  Link,
  Match,
  Miss
} = ReactRouter;

const {
  orgByIdSelector,
  orgSectionsSelector
} = selectors;

const Org = ({
  org = {},
  sections = []
}) => {
  if (isEmpty(org)) {
    return (
      <NotFound />
    );
  }

  const navLinks = sections.map((name) => (
    <Li key={name}>
      <Link activeClassName='active' to={`/${org.id}/${name}`}>
        <FormattedMessage id={name} />
      </Link>
    </Li>
  ));

  const navMatches = sections.map((name) => (
    <Match
      component={SectionComponents[name]}
      key={name}
      pattern={`/:org/${name}`}
    />
  ));

  const missMatch = !sections.length ? null : (
    <Miss component={Redirect(`/${org.id}/${sections[0]}`)} />
  );

  return (
    <div>
      <H1>{org.name}</H1>
      <Ul>
        {navLinks}
      </Ul>
      {navMatches}
      {missMatch}
    </div>
  );
};

Org.propTypes = {
  org: React.PropTypes.shape({
    owner: React.PropTypes.string,
    uuid: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  sections: React.PropTypes.arrayOf(
    React.PropTypes.string
  )
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.params.org)(state),
  sections: orgSectionsSelector(ownProps.params.org)(state)
});

module.exports = connect(mapStateToProps)(Org);
