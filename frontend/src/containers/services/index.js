const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const EmptyServices = require('@components/empty/services');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector
} = selectors;

const {
  Link
} = ReactRouter;

const Services = ({
  org = {},
  project = {},
  services = []
}) => {
  const empty = services.length ? null : (
    <EmptyServices />
  );

  const serviceList = (services) => {
    if (!services || !services.length) {
      return null;
    }

    const list = services.map((service) => {
      const to = `/${org.id}/projects/${project.id}/services/${service.id}`;

      return (
        <li key={service.id}>
          <Link activeClassName='active' to={to}>
            {service.name}
          </Link>
          {serviceList(service.services)}
        </li>
      );
    });

    return (
      <ul>
        {list}
      </ul>
    );
  };

  return (
    <div>
      {empty}
      <Row>
        {serviceList(services)}
      </Row>
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
