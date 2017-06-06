import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import ServicesQuery from '@graphql/ServicesTopology.gql';
import { Modal } from 'joyent-ui-toolkit';

const propTypes = {
  history: PropTypes.object
};

class ServiceModal extends PureComponent {
  constructor(props) {
    super(props);

    this.onCloseClick = this.onCloseClick.bind(this);
  }
  onCloseClick() {
    const { history, match } = this.props;

    const closeUrl = match.url.split('/').slice(0, -2).join('/');

    history.push(closeUrl);
  }

  render() {
    return (
      <Modal width={460} onCloseClick={this.onCloseClick}>
        {this.props.children}
      </Modal>
    );
  }
}

ServiceModal.propTypes = propTypes;

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

const ServiceModalWithData = compose(ServicesGql)(ServiceModal);

export default ServiceModalWithData;