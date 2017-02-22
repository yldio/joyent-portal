const React = require('react');
const ReactRedux = require('react-redux');

const EmptyServices = require('@components/empty/services');
const PropTypes = require('@root/prop-types');
const ServiceItem = require('@components/service/item');
const ServiceViewToggle = require('@components/service/view-toggle');
const selectors = require('@state/selectors');

const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const BaseELements = require('@ui/components/base-elements');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector,
  servicesForTopologySelector
} = selectors;

const {
  H2
} = BaseELements;

const Services = ({
  org = {},
  project = {},
  services = [],
  servicesForTopology = []
}) => {
  const empty = services.length ? null : (
    <EmptyServices />
  );

  const serviceList = services.map((service) => (
    <ServiceItem
      key={service.uuid}
      org={org.id}
      project={project.id}
      service={service}
    />
  ));

  return (
    <Row>
      <Column xs={12}>
        <H2>Services</H2>

        <ServiceViewToggle />

        {empty}
        {serviceList}
      </Column>
    </Row>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service),
  servicesForTopology: React.PropTypes.arrayOf(React.PropTypes.object)
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesByProjectIdSelector(match.params.projectId)(state),
  servicesForTopology:
    servicesForTopologySelector(match.params.projectId)(state)
});

module.exports = connect(
  mapStateToProps
)(Services);
