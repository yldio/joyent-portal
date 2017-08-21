import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ServicesDeleteMutation from '@graphql/ServicesDeleteMutation.gql';
import { Loader, ModalErrorMessage } from '@components/messaging';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';
import { Modal } from 'joyent-ui-toolkit';
import ServiceGql from './service-gql';
import { withNotFound, GqlPaths } from '@containers/navigation';

export class ServiceDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  render() {
    const { loading, error, match, history } = this.props;

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
            message='An error occurred while loading your service.'
            onCloseClick={handleCloseClick}
          />
        </Modal>
      );
    }

    const { service, deleteServices } = this.props;

    if (this.state.error) {
      return (
        <Modal width={460} onCloseClick={handleCloseClick}>
          <ModalErrorMessage
            title='Ooops!'
            message={`An error occurred while attempting to delete your ${service.name} service.`}
            onCloseClick={handleCloseClick}
          />
        </Modal>
      );
    }

    const handleConfirmClick = evt => {
      deleteServices(service.id).then(() => handleCloseClick()).catch(err => {
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
  loading: PropTypes.bool,
  error: PropTypes.bool,
  match: PropTypes.object,
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

export default compose(
  DeleteServicesGql,
  ServiceGql,
  withNotFound([ GqlPaths.SERVICES ])
)(ServiceDelete);
