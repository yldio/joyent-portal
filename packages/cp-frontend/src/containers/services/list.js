import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
// import { connect } from 'react-redux';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import PortalQuery from '@graphql/Portal.gql';
import ServicesQuery from '@graphql/Services.gql';

import { processServices } from '@root/state/selectors';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceListItem } from '@components/services';

const StyledContainer = styled.div`
  position: relative;
`;

class ServiceList extends Component {
  render() {
    const { deploymentGroup, services, loading, error } = this.props;

    if (loading) {
      return (
        <LayoutContainer>
          <Loader />
        </LayoutContainer>
      );
    } else if (error) {
      return (
        <LayoutContainer>
          <ErrorMessage message="Oops, and error occured while loading your services." />
        </LayoutContainer>
      );
    }

    const serviceList = services.map(service => (
      <ServiceListItem
        key={service.uuid}
        onQuickActions={null /* onQuickActions */}
        deploymentGroup={deploymentGroup.slug}
        service={service}
        uiTooltip={null /* uiTooltip */}
      />
    ));

    return (
      <LayoutContainer>
        <StyledContainer>
          <div>
            {/* <div ref={this.ref('container')}> */}
            {serviceList}
            {/* <ServicesTooltip {...uiTooltip} onBlur={handleTooltipBlur} /> */}
          </div>
        </StyledContainer>
      </LayoutContainer>
    );
  }
}

const PortalGql = graphql(PortalQuery, {});

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    deploymentGroup,
    services: deploymentGroup
      ? processServices(deploymentGroup.services, null)
      : null,
    loading,
    error
  })
});

const ServiceListWithData = compose(PortalGql, ServicesGql)(ServiceList);

export default ServiceListWithData;
