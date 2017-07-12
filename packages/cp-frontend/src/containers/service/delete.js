import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ServicesDeleteMutation from '@graphql/ServicesDeleteMutation.gql';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';
import { Modal } from 'joyent-ui-toolkit';
import ServiceGql from './service-gql';

class ServiceDelete extends Component {
  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    if (this.props.error) {
      return (
        <ErrorMessage message="Oops, an error occured while loading your service." />
      );
    }

    const { service, deleteServices, history, match } = this.props;

    const handleCloseClick = evt => {
      const closeUrl = match.url.split('/').slice(0, -2).join('/');
      history.replace(closeUrl);
    };

    const handleConfirmClick = evt => {
      deleteServices(service.id).then(() => handleCloseClick());
    };

    return (
      <Modal width={460} onCloseClick={handleCloseClick}>
        <ServiceDeleteComponent
          service={service}
          onConfirmClick={handleConfirmClick}
          onCancelClick={handleCloseClick}
        />
      </Modal>
    );
  }
}

ServiceDelete.propTypes = {
  service: PropTypes.object,
  history: PropTypes.object,
  deleteServices: PropTypes.func.isRequired
};

const DeleteServicesGql = graphql(ServicesDeleteMutation, {
  props: ({ mutate }) => ({
    deleteServices: serviceId =>
      mutate({
        variables: { ids: [serviceId] }
      })
  })
});

const ServiceDeleteWithData = compose(DeleteServicesGql, ServiceGql)(
  ServiceDelete
);

export default ServiceDeleteWithData;
