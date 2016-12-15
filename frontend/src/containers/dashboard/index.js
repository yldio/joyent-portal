const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const H1 = require('@ui/components/h1');
const Li = require('@ui/components/horizontal-list/li');
const Redirect = require('@components/redirect');
const Ul = require('@ui/components/horizontal-list/ul');

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
  Miss
} = ReactRouter;

const Dashboard = ({
  pathname = '',
  user = {}
}) => {
  return (
    <div>
      <H1>
        <FormattedMessage id='your-dashboard' />
      </H1>
      <Ul>
        <Li>
          <Link activeClassName='active' to={`/${user.id}/projects`}>
            <FormattedMessage id='projects' />
          </Link>
        </Li>
        <Li>
          <Link activeClassName='active' to={`/${user.id}/settings`}>
            <FormattedMessage id='settings' />
          </Link>
        </Li>
      </Ul>
      <Match component={Projects} pattern={`/${user.id}/projects`} />
      <Match component={Settings} pattern={`/${user.id}/settings`} />
      <Miss component={Redirect(`/${user.id}/projects`)} />
    </div>
  );
};

Dashboard.propTypes = {
  pathname: React.PropTypes.string,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })
};

const mapStateToProps = (state) => ({
  projects: state.session.data.projects,
  user: {
    id: state.session.data.name,
    name: state.session.data.name
  }
});

module.exports = connect(mapStateToProps)(Dashboard);
