const ReactRedux = require('react-redux');

const Projects = require('@components/projects');

const {
  connect
} = ReactRedux;

const mapStateToProps = (state, ownProps) => {
  return {
    projects: (state.session.data.orgs.filter((org) => {
      return org.id === ownProps.params.org;
    }).pop() || {}).projects
  };
};

module.exports = connect(mapStateToProps)(Projects);
