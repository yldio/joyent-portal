import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import ServiceScaleMutation from '@graphql/ServiceScale.gql';
import { Loader, ModalErrorMessage } from '@components/messaging';
import { ServiceScale as ServiceScaleComponent } from '@components/service';
import { Modal, ModalHeading, Button } from 'joyent-ui-toolkit';
import ServiceGql from './service-gql';
import { withNotFound, GqlPaths } from '@containers/navigation';

class ServiceScale extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  render() {
    const { loading, error, match, history, location } = this.props;

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    if (loading) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <Loader />
        </Modal>
      );
    }

    if (error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalErrorMessage
            title='Ooops!'
            message='An error occured while loading your service.'
            onCloseClick={handleCloseClick} />
        </Modal>
      );
    }

    const { service, scale } = this.props;

    if(this.state.error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalErrorMessage
            title='Ooops!'
            message={`An error occured while attempting to scale the ${service.name} service.`}
            onCloseClick={handleCloseClick} />
        </Modal>
      );
    }

    const validateReplicas = ({ replicas }) => {
      if (replicas === '') {
        return {
          replicas:
            'Please enter the number of instances you would like to scale to.'
        };
      }
    };

    const handleSubmitClick = values => {
      scale(service.id, values.replicas)
        .then(handleCloseClick)
        .catch((err) => {
          this.setState({ error: err });
        });
    };

    if (!service) {
      setTimeout(handleCloseClick, 33);
      return null;
    }

    const ServiceScaleForm = reduxForm({
      form: 'scale-service',
      destroyOnUnmount: true,
      forceUnregisterOnUnmount: true,
      validate: validateReplicas,
      initialValues: {
        replicas: service.instances.length
      }
    })(ServiceScaleComponent);

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

export default compose(
  ServiceScaleGql,
  ServiceGql,
  withNotFound([ GqlPaths.SERVICES ])
)(ServiceScale);
