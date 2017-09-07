import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import forceArray from 'force-array';
import unitcalc from 'unitcalc';

import ServicesQuery from '@graphql/ServicesTopology.gql';
import { processServicesForTopology } from '@root/state/selectors';
import { toggleServicesQuickActions } from '@root/state/actions';
import { withNotFound, GqlPaths } from '@containers/navigation';
import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { Topology } from 'joyent-ui-toolkit';

const StyledBackground = styled.div`
  padding: ${unitcalc(4)};
  background-color: ${props => props.theme.whiteActive};
`;

const StyledContainer = styled.div`
  position: relative;
`;

export class ServicesTopology extends Component {
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
      url,
      push,
      deploymentGroup,
      services,
      loading,
      error,
      toggleServicesQuickActions
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

    const handleQuickActionsClick = (evt, tooltipData) => {
      const container = this._refs.container;
      const containerRect = container.getBoundingClientRect();
      const position = {
        top: `${containerRect.top +
          window.scrollY +
          tooltipData.position.top}px`,
        left: `${containerRect.left +
          window.scrollX +
          tooltipData.position.left}px`
      };
      const data = {
        ...tooltipData,
        position
      };
      toggleServicesQuickActions(data);
    };

    const handleNodeTitleClick = (evt, { service }) => {
      push(
        `${url
          .split('/')
          .slice(0, 3)
          .join('/')}/services/${service.slug}`
      );
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

    return (
      <div>
        {renderedError}
        <StyledBackground>
          <StyledContainer>
            <div ref={this.ref('container')}>
              <Topology
                services={services}
                onQuickActionsClick={handleQuickActionsClick}
                onNodeTitleClick={handleNodeTitleClick}
              />
            </div>
          </StyledContainer>
        </StyledBackground>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
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

const ServicesTopologyWithData = compose(
  ServicesGql,
  UiConnect,
  withNotFound([GqlPaths.DEPLOYMENT_GROUP])
)(ServicesTopology);

export default ServicesTopologyWithData;