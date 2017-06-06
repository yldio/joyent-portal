import React from 'react';
import { ServiceDelete as ServiceDeleteComponent } from '@components/service';
import { ServiceModal } from '@containers/service';

const ServiceDelete = props => (
  <ServiceModal {...props}>
    <ServiceDeleteComponent />
  </ServiceModal>
);

class ServiceDelete extends PureComponent {
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
        <ServiceDeleteComponent />
      </Modal>
    );
  }
}

ServiceDelete.propTypes = {
  service: PropTypes.object
};

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

const ServiceDeleteWithData = compose(ServicesGql)(ServiceDelete);

export default ServiceDeleteWithData;
