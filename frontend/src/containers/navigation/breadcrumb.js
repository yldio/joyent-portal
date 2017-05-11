import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb as BreadcrumbComponent } from '@components/navigation';

const Breadcrumb = ({
  deploymentGroup,
  service,
  location
}) => {

  const path = location.pathname.split('/');

  const links = [];

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
    const deploymentGroupId = params.deploymentGroup;
    const serviceId = params.service;
    const apolloData = state.apollo.data;
    const keys = Object.keys(apolloData);

    let deploymentGroup, service;
    if(keys.length) {
      // These should be selectors
      if(deploymentGroupId) {
        deploymentGroup = keys.reduce((dg, k) =>
          apolloData[k].__typename === 'DeploymentGroup' &&
            apolloData[k].id === deploymentGroupId ?
              apolloData[k] : dg, {});
        if(serviceId) {
          service = keys.reduce((s, k) =>
            apolloData[k].__typename === 'Service' &&
              apolloData[k].id === serviceId ?
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
