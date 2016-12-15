const isEmpty = require('lodash.isempty');
const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const H1 = require('@ui/components/h1');
const Li = require('@ui/components/horizontal-list/li');
const Ul = require('@ui/components/horizontal-list/ul');

const NotFound = require('@containers/not-found');

const People = require('./people');
const Projects = require('./projects');
const Settings = require('./settings');

const {
  FormattedMessage
} = ReactIntl;

const {
  connect
} = ReactRedux;

const {
  Link,
  Match,
  Miss,
  Redirect
} = ReactRouter;

const Org = ({
  org = {},
  params = {},
  user = {}
}) => {
  if (user.id === params.org) {
    return null;
  }

  if (isEmpty(org)) {
    return (
      <NotFound />
    );
  }

  return (
    <div>
      <H1>{org.name}</H1>
      <Ul>
        <Li>
          <Link activeClassName='active' to={`/${org.id}/projects`}>
            <FormattedMessage id='projects' />
          </Link>
        </Li>
        <Li>
          <Link activeClassName='active' to={`/${org.id}/people`}>
            <FormattedMessage id='people' />
          </Link>
        </Li>
        <Li>
          <Link activeClassName='active' to={`/${org.id}/settings`}>
            <FormattedMessage id='settings' />
          </Link>
        </Li>
      </Ul>
      <Match component={Projects} pattern='/:org/projects' />
      <Match component={People} pattern='/:org/people' />
      <Match component={Settings} pattern='/:org/settings' />
      <Miss component={Redirect(`/${org.id}/projects`)} />
    </div>
  );
};

Org.propTypes = {
  org: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  params: React.PropTypes.shape({
    org: React.PropTypes.string
  }),
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })
};

const mapStateToProps = (state, ownProps) => ({
  org: state.session.data.orgs.filter((org) => {
    return org.id === ownProps.params.org;
  }).pop(),
  user: {
    id: state.session.data.name,
    name: state.session.data.name
  }
});

module.exports = connect(mapStateToProps)(Org);
