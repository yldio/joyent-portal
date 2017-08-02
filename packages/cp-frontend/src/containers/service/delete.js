import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ServicesDeleteMutation from '@graphql/ServicesDeleteMutation.gql';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';
import { Modal, ModalHeading, Button } from 'joyent-ui-toolkit';
import ServiceGql from './service-gql';

class ServiceDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  render() {
    const { loading, error } = this.props;

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
          <ErrorMessage
            title='Ooops!'
            message='An error occured while loading your service.' />
        </Modal>
      );
    }

    const { service, deleteServices, history, match } = this.props;

    if(this.state.error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalHeading>
            Deleting a service: <br /> {service.name}
          </ModalHeading>
          <ErrorMessage
            title='Ooops!'
            message='An error occurred while attempting to delete your service.' />
          <Button onClick={handleCloseClick} secondary>
            Ok
          </Button>
        </Modal>
      );
    }

    const handleConfirmClick = evt => {
      deleteServices(service.id)
        .then(() => handleCloseClick())
        .catch((err) => {
          this.setState({ error: err });
        });
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

export default compose(DeleteServicesGql, ServiceGql)(ServiceDelete);
