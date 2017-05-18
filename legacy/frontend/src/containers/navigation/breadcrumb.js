import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb as BreadcrumbComponent } from '@components/navigation';
import { deploymentGroupBySlugSelector, serviceBySlugSelector} from '@root/state/selectors';

const Breadcrumb = ({
  deploymentGroup,
  service,
  location
}) => {

  const path = location.pathname.split('/');

  const links = [{
    name: 'Dashboard',
    pathname: '/'
  }];

  if(deploymentGroup) {
    links.push({
      name: deploymentGroup.name,
      pathname: path.slice(0, 3).join('/')
    });
  }

  if(service) {
    links.push({
      name: service.name,
      pathname: path.slice(0, 5).join('/')
    });
  }

  return (
    <BreadcrumbComponent links={links} />
  );
};

const ConnectedBreadcrumb = connect(
  (state, ownProps) => {
    const params = ownProps.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;
    return {
      deploymentGroup: deploymentGroupBySlugSelector(deploymentGroupSlug)(state),
      service: serviceBySlugSelector(serviceSlug)(state),
      location: ownProps.location
    };
  },
  (dispatch) => ({})
)(Breadcrumb);

export default ConnectedBreadcrumb;
