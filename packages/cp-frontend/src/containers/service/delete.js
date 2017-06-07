import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import InstancesQuery from '@graphql/Instances.gql';
import { Modal } from 'joyent-ui-toolkit';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';

class ServiceDelete extends Component {

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
            <ServiceDeleteComponent service={service} onCancelClick={handleCloseClick} />;

    return (
      <Modal width={460} onCloseClick={handleCloseClick}>
        { content }
      </Modal>
    )
  }
}

ServiceDelete.propTypes = {
  service: PropTypes.object
};

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

const ServiceDeleteWithData = compose(
  InstancesGql
)(ServiceDelete);

export default ServiceDeleteWithData;
