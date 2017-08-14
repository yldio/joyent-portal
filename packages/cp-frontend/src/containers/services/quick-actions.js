import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import ServicesRestartMutation from '@graphql/ServicesRestartMutation.gql';
import ServicesStopMutation from '@graphql/ServicesStopMutation.gql';
import ServicesStartMutation from '@graphql/ServicesStartMutation.gql';
import { Tooltip, TooltipLabel } from 'joyent-ui-toolkit';
import { toggleServicesQuickActions } from '@root/state/actions';
import { ServicesQuickActions as QuickActions } from '@components/services';
import { ErrorMessage } from '@components/messaging';
import { LayoutContainer } from '@components/layout';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

class ServicesQuickActions extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    }
  }

  render() {
    const {
      servicesQuickActions,
      toggleServicesQuickActions,
      restartServices,
      stopServices,
      startServices,
      url,
      push
    } = this.props;

    let errorMessage = null;
    let quickActions = null;

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

       errorMessage = (
        <LayoutContainer>
          <ErrorMessage title="Ooops!" message={message} />
        </LayoutContainer>
      );
    }

    if(servicesQuickActions.show) {
      const handleTooltipBlur = evt => {
        toggleServicesQuickActions({ show: false });
      };

      const handleRestartClick = (evt, service) => {
        this.setState({errors: {}});
        toggleServicesQuickActions({ show: false });
        restartServices(service.id).catch(err => {
          this.setState({ errors: { restart: err } });
        });
      };

      const handleStopClick = (evt, service) => {
        this.setState({errors: {}});
        toggleServicesQuickActions({ show: false });
        stopServices(service.id).catch(err => {
          this.setState({ errors: { stop: err } });
        });
      };

      const handleStartClick = (evt, service) => {
        this.setState({errors: {}});
        toggleServicesQuickActions({ show: false });
        startServices(service.id).catch(err => {
          this.setState({ errors: { start: err } });
        });
      };

      const handleScaleClick = (evt, service) => {
        this.setState({errors: {}});
        toggleServicesQuickActions({ show: false });
        push(`${url}/${service.slug}/scale`);
      };

      const handleDeleteClick = (evt, service) => {
        this.setState({errors: {}});
        toggleServicesQuickActions({ show: false });
        push(`${url}/${service.slug}/delete`);
      };

      quickActions = (
        <StyledContainer>
          <QuickActions
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
      )
    }

    if(quickActions || errorMessage) {
      return (
        <div>
          {errorMessage}
          {quickActions}
        </div>
      )
    }

    return null;
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

const ConnectedServicesQuickActions = compose(
  ServicesRestartGql,
  ServicesStopGql,
  ServicesStartGql,
  UiConnect
)(ServicesQuickActions);

export default ConnectedServicesQuickActions;
