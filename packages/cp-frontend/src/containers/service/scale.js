import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import InstancesQuery from '@graphql/Instances.gql';
import { Modal } from 'joyent-ui-toolkit';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceScale as ServiceScaleComponent } from '@components/service';

class ServiceScale extends Component {

  render() {

    const {
      loading,
      error,
      service,
      history,
      match
    } = this.props;

    const handleCloseClick = () => {

      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    }

    const content = loading ?
      <Loader /> : error ?
        <ErrorMessage message="Oops, and error occured while loading your service." /> :
            <ServiceScaleComponent service={service} onCancelClick={handleCloseClick} />;

    return (
      <Modal width={460} onCloseClick={handleCloseClick}>
        { content }
      </Modal>
    )
  }
}

ServiceScale.propTypes = {
  history: PropTypes.object
}

const InstancesGql = graphql(InstancesQuery, {
  options(props) {
    const params = props.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;
    return {
      variables: {
        deploymentGroupSlug,
        serviceSlug
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    service: deploymentGroup &&
      deploymentGroup.services &&
        deploymentGroup.services.length ?
          deploymentGroup.services[0] : null,
    loading,
    error
  })
});

const ServiceScaleWithData = compose(
  InstancesGql
)(ServiceScale);

export default ServiceScaleWithData;
