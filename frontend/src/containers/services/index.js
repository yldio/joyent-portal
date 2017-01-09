const React = require('react');
const ReactRedux = require('react-redux');

const EmptyServices = require('@components/empty/services');
const PropTypes = require('@root/prop-types');
const Service = require('./service');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector
} = selectors;

const Services = ({
  org = {},
  project = {},
  services = []
}) => {
  const empty = services.length ? null : (
    <EmptyServices />
  );

  const serviceList = services.map((service) => (
    <Service
      key={service.uuid}
      org={org.id}
      project={project.id}
      service={service}
    />
  ));

  return (
    <div>
      {empty}
      {serviceList}
    </div>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  project: projectByIdSelector(params.projectId)(state),
  services: servicesByProjectIdSelector(params.projectId)(state)
});

module.exports = connect(
  mapStateToProps
)(Services);
