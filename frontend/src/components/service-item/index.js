const forceArray = require('force-array');
const React = require('react');
const ReactRouter = require('react-router');

const Anchor = require('@ui/components/anchor');
const List = require('@ui/components/list');
const MetricsRow = require('@components/metrics-row');
const PropTypes = require('@root/prop-types');

const {
  Link
} = ReactRouter;

const {
  ListItem,
  ListItemView,
  ListItemMeta,
  ListItemTitle,
  ListItemSubTitle,
  ListItemDescription,
  ListItemGroupView,
  ListItemOutlet,
  ListItemOptions,
  ListItemHeader
} = List;

const ServiceItem = ({
  org = '',
  project = '',
  service = {}
}) => {
  const isChild = !!service.parent;

  const childs = forceArray(service.services).map((service) => (
    <ServiceItem
      key={service.uuid}
      org={org}
      project={project}
      service={service}
    />
  ));

  const to = `/${org}/projects/${project}/services/${service.id}`;

  const title = isChild ? (
    <ListItemTitle>{service.name}</ListItemTitle>
  ) : (
    <ListItemTitle>
      <Link to={to}>
        {Anchor.fn(
          <Anchor secondary>
            {service.name}
          </Anchor>
        )}
      </Link>
    </ListItemTitle>
  );

  const subtitle = (
    <ListItemSubTitle>{service.instances} instances</ListItemSubTitle>
  );

  const description = (
    <ListItemDescription>Flags</ListItemDescription>
  );

  const header = isChild ? null : (
    <ListItemHeader>
      <ListItemMeta>
        {title}
        {subtitle}
        {description}
      </ListItemMeta>
      <ListItemOptions>…</ListItemOptions>
    </ListItemHeader>
  );

  const view = childs.length ? (
    <ListItemGroupView>
      {childs}
    </ListItemGroupView>
  ) : (
    <ListItemView>
      <ListItemMeta>
        {isChild && title}
        {isChild && subtitle}
        {description}
      </ListItemMeta>
      <ListItemOutlet>
        <MetricsRow metrics={service.metrics} />
      </ListItemOutlet>
    </ListItemView>
  );

  return (
    <ListItem
      collapsed={service.collapsed}
      flat={isChild}
      headed={!isChild}
      key={service.uuid}
      stacked={isChild && (service.instances > 1)}
    >
      {header}
      {view}
    </ListItem>
  );
};

ServiceItem.propTypes = {
  org: React.PropTypes.string,
  project: React.PropTypes.string,
  service: PropTypes.service
};

module.exports = ServiceItem;
