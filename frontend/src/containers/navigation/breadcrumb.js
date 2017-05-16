import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb as BreadcrumbComponent } from '@components/navigation';

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
    const deploymentGroupPathName = params.deploymentGroup;
    const servicePathName = params.service;
    const apolloData = state.apollo.data;
    const keys = Object.keys(apolloData);

    let deploymentGroup, service;
    if(keys.length) {
      // These should be selectors
      if(deploymentGroupPathName) {
        deploymentGroup = keys.reduce((dg, k) =>
          apolloData[k].__typename === 'DeploymentGroup' &&
            apolloData[k].pathName === deploymentGroupPathName ?
              apolloData[k] : dg, {});
        if(servicePathName) {
          service = keys.reduce((s, k) =>
            apolloData[k].__typename === 'Service' &&
              apolloData[k].pathName === servicePathName ?
                apolloData[k] : s, {});
        }
      }
    }
    return {
      deploymentGroup,
      service,
      location: ownProps.location
    };
  },
  (dispatch) => ({})
)(Breadcrumb);

export default ConnectedBreadcrumb;
