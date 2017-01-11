const forceArray = require('force-array');
const React = require('react');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const Anchor = require('@ui/components/anchor');
const Column = require('@ui/components/column');
const List = require('@ui/components/list');
const MiniMetric = require('@ui/components/mini-metric');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');

const {
  Link
} = ReactRouter;

const {
  default: styled
} = Styled;

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

const {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
} = MiniMetric;

const MetricsRow = styled(Row)`
  margin: 0;

  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`;

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

  const metrics = service.metrics.map((metric, i) => (
    <Column key={i} xs={4}>
      <MiniMetricView borderless>
        <MiniMetricMeta>
          <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
          <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
        </MiniMetricMeta>
        <MiniMetricGraph data={metric.data} />
      </MiniMetricView>
    </Column>
  ));

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
        <MetricsRow>
          {metrics}
        </MetricsRow>
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
