import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import ServiceScaleMutation from '@graphql/ServiceScale.gql';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceScale as ServiceScaleComponent } from '@components/service';
import { Modal } from 'joyent-ui-toolkit';
import ServiceGql from './service-gql';

class ServiceScale extends Component {
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.error) {
      return (
        <ErrorMessage message="Oops, an error occured while loading your service." />
      );
    }

    const { service, scale, history, match } = this.props;

    const validateReplicas = ({ replicas }) => {
      if (replicas === '') {
        return {
          replicas:
            'Please enter the number of instances you would like to scale to.'
        };
      }
    };

    const ServiceScaleForm = reduxForm({
      form: 'scale-service',
      destroyOnUnmount: true,
      forceUnregisterOnUnmount: true,
      validate: validateReplicas,
      initialValues: {
        replicas: service.instances.length
      }
    })(ServiceScaleComponent);

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    const handleSubmitClick = values => {
      scale(service.id, values.replicas);
    };

    return (
      <Modal width={460} onCloseClick={handleCloseClick}>
        <ServiceScaleForm
          service={service}
          onSubmit={handleSubmitClick.bind(this)}
          onCancel={handleCloseClick}
        />
      </Modal>
    );
  }
}

ServiceScale.propTypes = {
  service: PropTypes.object,
  history: PropTypes.object,
  scale: PropTypes.func.isRequired
};

const ServiceScaleGql = graphql(ServiceScaleMutation, {
  props: ({ mutate }) => ({
    scale: (serviceId, replicas) =>
      mutate({
        variables: {
          serviceId,
          replicas
        }
      })
  })
});

const ServiceScaleWithData = compose(ServiceScaleGql, ServiceGql)(ServiceScale);

export default ServiceScaleWithData;
