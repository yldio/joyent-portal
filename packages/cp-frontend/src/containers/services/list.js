import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ServicesQuery from '@graphql/Services.gql';

import { processServices } from '@root/state/selectors';
import { toggleServicesQuickActions } from '@root/state/actions';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceListItem } from '@components/services';

const StyledContainer = styled.div`
  position: relative;
`;

class ServiceList extends Component {
  render() {
    const {
      deploymentGroup,
      services,
      loading,
      error,
      servicesQuickActions,
      toggleServicesQuickActions
    } = this.props;

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

    const handleQuickActionsClick = o => {
      toggleServicesQuickActions(o);
    };

    const handleQuickActionsBlur = o => {
      toggleServicesQuickActions(o);
    };

    const serviceList = services.map(service => (
      <ServiceListItem
        key={service.uuid}
        deploymentGroup={deploymentGroup.slug}
        service={service}
        showQuickActions={
          servicesQuickActions.service &&
            servicesQuickActions.service.uuid === service.uuid
        }
        onQuickActionsClick={handleQuickActionsClick}
        onQuickActionsBlur={handleQuickActionsBlur}
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

const mapStateToProps = (state, ownProps) => ({
  servicesQuickActions: state.ui.services.quickActions
});

const mapDispatchToProps = dispatch => ({
  toggleServicesQuickActions: data => dispatch(toggleServicesQuickActions(data))
});

const UiConnect = connect(mapStateToProps, mapDispatchToProps);

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

const ServiceListWithData = compose(ServicesGql, UiConnect)(ServiceList);

export default ServiceListWithData;
