import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ServicesQuery from '@graphql/Services.gql';
import ServicesRestartMutation from '@graphql/ServicesRestartMutation.gql';
import ServicesStopMutation from '@graphql/ServicesStopMutation.gql';
import ServicesStartMutation from '@graphql/ServicesStartMutation.gql';
import unitcalc from 'unitcalc';

import { processServicesForTopology } from '@root/state/selectors';
import { toggleServicesQuickActions } from '@root/state/actions';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServicesQuickActions } from '@components/services';

import { Topology } from 'joyent-ui-toolkit';

const StyledBackground = styled.div`
  padding: ${unitcalc(4)};
  background-color: ${props => props.theme.whiteActive};
`;

const StyledContainer = styled.div`
  position: relative;
`;

class ServicesTopology extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  render() {

    const {
      url,
      push,
      deploymentGroup,
      services,
      datacenter,
      loading,
      error,
      servicesQuickActions,
      toggleServicesQuickActions,
      restartServices,
      stopServices,
      startServices
    } = this.props;

    if (loading) {
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
            title='Ooops!'
            message='An error occured while loading your services.' />
        </LayoutContainer>
      );
    }

    if (
      deploymentGroup.status === 'PROVISIONING' &&
      !forceArray(services).length
    ) {
      return (
        <LayoutContainer center>
          <Loader msg="Just a moment, we’re on it" />
        </LayoutContainer>
      );
    }

    const handleQuickActionsClick = (evt, tooltipData) => {
      toggleServicesQuickActions(tooltipData);
    };

    const handleTooltipBlur = evt => {
      toggleServicesQuickActions({ show: false });
    };

    const handleRestartClick = (evt, service) => {
      this.setState({ errors: {} });
      restartServices(service.id)
        .catch((err) => {
          this.setState({ errors: { restart: err }});
        });
    };

    const handleStopClick = (evt, service) => {
      this.setState({ errors: {} });
      stopServices(service.id)
        .catch((err) => {
          this.setState({ errors: { stop: err }});
        });
    };

    const handleStartClick = (evt, service) => {
      this.setState({ errors: {} });
      startServices(service.id)
        .catch((err) => {
          this.setState({ errors: { start: err }});
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

    const handleNodeTitleClick = (evt, { service }) => {
      push(`${url.split('/').slice(0, 3).join('/')}/services/${service.slug}`);
    };

    let renderedError = null;

    if (this.state.errors.stop || this.state.errors.start || this.state.errors.restart) {

      const message = this.state.errors.stop
        ? 'An error occured while attempting to stop your service.'
        : this.state.errors.start
        ? 'An error occured while attempting to start your service.'
        : this.state.errors.restart
        ? 'An error occured while attempting to restart your service.'
        : '';

      renderedError = (
        <LayoutContainer>
          <ErrorMessage
            title='Ooops!'
            message={message} />
        </LayoutContainer>
      );
    }

    return (
      <div>
        { renderedError }
        <StyledBackground>
          <StyledContainer>
            <Topology
              services={services}
              onQuickActionsClick={handleQuickActionsClick}
              onNodeTitleClick={handleNodeTitleClick}
            />
            <ServicesQuickActions
              service={servicesQuickActions.service}
              show={servicesQuickActions.show}
              position={servicesQuickActions.position}
              onBlur={handleTooltipBlur}
              onRestartClick={handleRestartClick}
              onStopClick={handleStopClick}
              onStartClick={handleStartClick}
              onScaleClick={handleScaleClick}
              onDeleteClick={handleDeleteClick}
            />
          </StyledContainer>
        </StyledBackground>
      </div>
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
  props: ({ data: { deploymentGroup = {}, loading, error } }) => ({
    deploymentGroup,
    services: deploymentGroup
      ? processServicesForTopology(deploymentGroup.services)
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

const ServicesTopologyWithData = compose(
  ServicesRestartGql,
  ServicesStopGql,
  ServicesStartGql,
  ServicesGql,
  UiConnect
)(ServicesTopology);

export default ServicesTopologyWithData;
