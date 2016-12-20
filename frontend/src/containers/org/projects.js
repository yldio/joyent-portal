const Projects = require('@components/projects');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  projectsByOrgIdSelector
} = selectors;


const mapStateToProps = (state, {
  params = {}
}) => ({
  projects: projectsByOrgIdSelector(params.org)(state)
});

module.exports = connect(
  mapStateToProps
)(Projects);

module.exports.mapStateToProps = mapStateToProps;
