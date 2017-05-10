import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {

  render() {

    const {
      deploymentGroup,
      service,
      match,
      location
    } = this.props;

    const dgLink = deploymentGroup ?
      <Link to={`/deployment-groups/${deploymentGroup.id}`}>
        {deploymentGroup.name}
      </Link> : null;
    const sLink = service ?
      <Link to={`/deployment-groups/${deploymentGroup.id}/services/${service.id}`}>
        {service.name}
      </Link> : null;
    let breadcrumb = dgLink && sLink ?
      <p>{dgLink} / {sLink}</p> : dgLink ?
      <p>{dgLink}</p> : null;

    return (
      <div>
        <div>
          <h3>{breadcrumb}</h3>
        </div>
      </div>
    );
  }
}

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
      service
    };
  },
  (dispatch) => ({})
)(Breadcrumb);

export default ConnectedBreadcrumb;
