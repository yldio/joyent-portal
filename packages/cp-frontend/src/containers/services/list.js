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

import { ServicesQuickActions } from '@components/services';

const StyledContainer = styled.div`
  position: relative;
`;

class ServiceList extends Component {
  ref(name) {
    this._refs = this._refs || {};

    return el => {
      this._refs[name] = el;
    };
  }

  render() {
    const {
      deploymentGroup,
      services,
      loading,
      error,
      servicesQuickActions,
      toggleServicesQuickActions,
      url
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

    const handleQuickActionsClick = (evt, service) => {
      const list = this._refs.container;
      const listRect = list.getBoundingClientRect();
      const button = evt.currentTarget;
      const buttonRect = button.getBoundingClientRect();

      const position = {
        left: buttonRect.left -
          listRect.left +
          (buttonRect.right - buttonRect.left) / 2,
        top: buttonRect.bottom - listRect.top
      };

      toggleServicesQuickActions({
        service,
        position
      });
    };

    const handleQuickActionsBlur = o => {
      toggleServicesQuickActions({ show: false });
    };

    const serviceList = services.map(service =>
      <ServiceListItem
        key={service.id}
        deploymentGroup={deploymentGroup.slug}
        service={service}
        onQuickActionsClick={handleQuickActionsClick}
      />
    );

    return (
      <LayoutContainer>
        <StyledContainer>
          <div ref={this.ref('container')}>
            {serviceList}
            <ServicesQuickActions
              position={servicesQuickActions.position}
              service={servicesQuickActions.service}
              show={servicesQuickActions.show}
              url={url}
              onBlur={handleQuickActionsBlur}
            />
          </div>
        </StyledContainer>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  servicesQuickActions: state.ui.services.quickActions,
  url: ownProps.match.url
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
