const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  FormattedMessage
} = ReactIntl;

const {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector
} = selectors;

const {
  Link
} = ReactRouter;

const EmptyServices = () => (
  <div>
    <Row name='empty-services'>
      <Column md={6} xs={12}>
        <h3>
          <FormattedMessage id='add-services' />
        </h3>
        <p>
          <FormattedMessage id='no-services' />
        </p>
      </Column>
    </Row>
    <Row>
      <Button>
        <FormattedMessage id='edit-project-manifest' />
      </Button>
    </Row>
    <Row>
      <p>
        <FormattedMessage id='or-bring-in-from' />
      </p>
    </Row>
    <Row>
      <Column>
        <Button secondary>GitHub</Button>
      </Column>
      <Column>
        <Button secondary>BitBucket</Button>
      </Column>
    </Row>
  </div>
);

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
