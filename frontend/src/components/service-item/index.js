const React = require('react');
const ReactRouter = require('react-router');

const Anchor = require('@ui/components/anchor');
const List = require('@ui/components/list');
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
  const to = `/${org}/projects/${project}/services/${service.id}`;

  const childs = service.services.map((service) => (
    <ListItem
      collapsed={service.collapsed}
      flat
      key={service.uuid}
      stacked={service.instances > 1}
    >
      <ListItemView>
        <ListItemMeta>
          <ListItemTitle>{service.name}</ListItemTitle>
          <ListItemSubTitle>{service.instances} instances</ListItemSubTitle>
        </ListItemMeta>
        <ListItemOutlet>
          Metrics
        </ListItemOutlet>
      </ListItemView>
    </ListItem>
  ));

  const view = childs.length ? (
    <ListItemGroupView>
      {childs}
    </ListItemGroupView>
  ) : (
    <ListItemView>
      <ListItemMeta>
        <ListItemDescription>Flags</ListItemDescription>
      </ListItemMeta>
      <ListItemOutlet>
        Metrics
      </ListItemOutlet>
    </ListItemView>
  );

  return (
    <ListItem
      collapsed={service.collapsed}
      headed
    >
      <ListItemHeader>
        <ListItemMeta>
          <ListItemTitle>
            <Link to={to}>
              {Anchor.fn(
                <Anchor secondary>
                  {service.name}
                </Anchor>
              )}
            </Link>
          </ListItemTitle>
          <ListItemSubTitle>{service.instances} instance</ListItemSubTitle>
        </ListItemMeta>
        <ListItemOptions>…</ListItemOptions>
      </ListItemHeader>
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
