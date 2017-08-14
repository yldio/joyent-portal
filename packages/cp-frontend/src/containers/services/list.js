import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';

import ServicesQuery from '@graphql/Services.gql';

import { processServices } from '@root/state/selectors';
import { toggleServicesQuickActions } from '@root/state/actions';
import { withNotFound, GqlPaths } from '@containers/navigation';
import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceListItem } from '@components/services';

const StyledContainer = styled.div`
  position: relative;
`;

class ServiceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }

  render() {
    const {
      deploymentGroup,
      services,
      loading,
      error,
      toggleServicesQuickActions,
    } = this.props;

    if (loading && !forceArray(services).length) {
      return (
        <LayoutContainer center>
          <Loader />
        </LayoutContainer>
      );
    }

    if (error) {
      return (
        <LayoutContainer>
          <ErrorMessage
            title="Ooops!"
            message="An error occurred while loading your services."
          />
        </LayoutContainer>
      );
    }

    if (
      deploymentGroup &&
      deploymentGroup.status === 'PROVISIONING' &&
      !forceArray(services).length
    ) {
      return (
        <LayoutContainer center>
          <Loader msg="Just a moment, we’re on it" />
        </LayoutContainer>
      );
    }

    const handleQuickActionsClick = (evt, service) => {
      const button = evt.currentTarget;
      const buttonRect = button.getBoundingClientRect();

      const position = {
        left:
          `${buttonRect.left + window.scrollX + (buttonRect.right - buttonRect.left) / 2}px`,
        top: `${buttonRect.bottom + window.scrollY}px`
      };

      toggleServicesQuickActions({
        service,
        position
      });
    };

    let renderedError = null;

    if (
      this.state.errors.stop ||
      this.state.errors.start ||
      this.state.errors.restart
    ) {
      const message = this.state.errors.stop
        ? 'An error occurred while attempting to stop your service.'
        : this.state.errors.start
          ? 'An error occurred while attempting to start your service.'
          : this.state.errors.restart
            ? 'An error occurred while attempting to restart your service.'
            : '';

      renderedError = (
        <LayoutContainer>
          <ErrorMessage title="Ooops!" message={message} />
        </LayoutContainer>
      );
    }

    const serviceList = sortBy(services, ['slug']).map(service => {
      return (
        <ServiceListItem
          key={service.id}
          deploymentGroup={deploymentGroup.slug}
          service={service}
          onQuickActionsClick={handleQuickActionsClick}
        />
      );
    });

    return (
      <LayoutContainer>
        {renderedError}
        <StyledContainer>
          {serviceList}
        </StyledContainer>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  toggleServicesQuickActions: data => dispatch(toggleServicesQuickActions(data))
});

const UiConnect = connect(mapStateToProps, mapDispatchToProps);

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      pollInterval: 1000,
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error }}) => ({
    deploymentGroup,
    services: deploymentGroup
      ? processServices(deploymentGroup.services, null)
      : null,
    loading,
    error
  })
});

const ServiceListWithData = compose(
  ServicesGql,
  UiConnect,
  withNotFound([ GqlPaths.DEPLOYMENT_GROUP ])
)(ServiceList);

export default ServiceListWithData;
