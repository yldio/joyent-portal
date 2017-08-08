import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';

import ServicesQuery from '@graphql/Services.gql';
import ServicesRestartMutation from '@graphql/ServicesRestartMutation.gql';
import ServicesStopMutation from '@graphql/ServicesStopMutation.gql';
import ServicesStartMutation from '@graphql/ServicesStartMutation.gql';

import { processServices } from '@root/state/selectors';
import { toggleServicesQuickActions } from '@root/state/actions';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceListItem } from '@components/services';

import { ServicesQuickActions } from '@components/services';

import { withNotFound, GqlPaths } from '@containers/navigation';

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
      url,
      push,
      restartServices,
      stopServices,
      startServices,
      location
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
      const list = this._refs.container;
      const listRect = list.getBoundingClientRect();
      const button = evt.currentTarget;
      const buttonRect = button.getBoundingClientRect();

      const position = {
        left:
          buttonRect.left -
          listRect.left +
          (buttonRect.right - buttonRect.left) / 2,
        top: buttonRect.bottom - listRect.top
      };

      toggleServicesQuickActions({
        service,
        position
      });
    };

    const handleRestartClick = (evt, service) => {
      this.setState({ errors: {} });
      restartServices(service.id).catch(err => {
        this.setState({ errors: { restart: err } });
      });
    };

    const handleStopClick = (evt, service) => {
      this.setState({ errors: {} });
      stopServices(service.id).catch(err => {
        this.setState({ errors: { stop: err } });
      });
    };

    const handleStartClick = (evt, service) => {
      this.setState({ errors: {} });
      startServices(service.id).catch(err => {
        this.setState({ errors: { start: err } });
      });
    };

    const handleScaleClick = (evt, service) => {
      toggleServicesQuickActions({ show: false });
      push(`${url}/${service.slug}/scale`);
    };

    const handleDeleteClick = (evt, service) => {
      toggleServicesQuickActions({ show: false });
      push(`${url}/${service.slug}/delete`);
    };

    const handleQuickActionsBlur = o => {
      toggleServicesQuickActions({ show: false });
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
          <div ref={this.ref('container')}>
            {serviceList}
            <ServicesQuickActions
              position={servicesQuickActions.position}
              service={servicesQuickActions.service}
              show={servicesQuickActions.show}
              onBlur={handleQuickActionsBlur}
              onRestartClick={handleRestartClick}
              onStopClick={handleStopClick}
              onStartClick={handleStartClick}
              onScaleClick={handleScaleClick}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </StyledContainer>
      </LayoutContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  servicesQuickActions: state.ui.services.quickActions,
  url: ownProps.match.url.replace(/\/$/, ''),
  push: ownProps.history.push
});

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

const ServicesRestartGql = graphql(ServicesRestartMutation, {
  props: ({ mutate }) => ({
    restartServices: serviceId => mutate({ variables: { ids: [serviceId] } })
  })
});

const ServicesStopGql = graphql(ServicesStopMutation, {
  props: ({ mutate }) => ({
    stopServices: serviceId => mutate({ variables: { ids: [serviceId] } })
  })
});

const ServicesStartGql = graphql(ServicesStartMutation, {
  props: ({ mutate }) => ({
    startServices: serviceId => mutate({ variables: { ids: [serviceId] } })
  })
});

const ServiceListWithData = compose(
  ServicesGql,
  ServicesRestartGql,
  ServicesStopGql,
  ServicesStartGql,
  ServicesGql,
  UiConnect,
  withNotFound([ GqlPaths.DEPLOYMENT_GROUP ])
)(ServiceList);

export default ServiceListWithData;
