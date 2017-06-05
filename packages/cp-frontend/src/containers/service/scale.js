import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import ServicesQuery from '@graphql/ServicesTopology.gql';
import { Modal } from 'joyent-ui-toolkit';
import { ServiceScale as ServiceScaleComponent } from '@components/service';

class ServiceScale extends Component {

  handleCloseClick() {
    // this.props.history.goBack();
    console.log('onCloseClick this.props = ', this.props);
    const {
      history,
      match
    } = this.props;

    const closeUrl = match.url.split('/').slice(0, -2).join('/');

    history.replace(closeUrl);
  }

  render() {
    return (
      <Modal width={460} onCloseClick={this.handleCloseClick.bind(this)}>
        <ServiceScaleComponent />
      </Modal>
    )
  }
}

ServiceScale.propTypes = {
  history: PropTypes.object
}

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    };
  },
  props: ({ data: { service, loading, error } }) => ({
    service: service,
    loading,
    error
  })
});

const ServiceScaleWithData = compose(ServicesGql)(
  ServiceScale
);

export default ServiceScaleWithData;
