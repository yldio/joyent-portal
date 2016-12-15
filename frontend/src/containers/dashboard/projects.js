const ReactRedux = require('react-redux');

const Projects = require('@components/projects');

const {
  connect
} = ReactRedux;

const mapStateToProps = (state) => ({
  projects: state.session.data.projects
});

module.exports = connect(mapStateToProps)(Projects);
