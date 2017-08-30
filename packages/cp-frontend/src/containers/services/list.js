import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import forceArray from 'force-array';
import sortBy from 'lodash.sortby';
import get from 'lodash.get';
import moment from 'moment';

import ServicesQuery from '@graphql/Services.gql';
import { toggleServicesQuickActions } from '@root/state/actions';
import { withNotFound, GqlPaths } from '@containers/navigation';
import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { ServiceListItem } from '@components/services';

import {
  withServiceMetricsPolling,
  withServiceMetricsGql
} from '@containers/metrics';

import {
  processServices,
  processInstancesMetrics
} from '@root/state/selectors';

// 'width' of graph, i.e. total duration of time it'll display and truncate data to
// amount of data we'll need to initially fetch
const GraphDurationSeconds = 90;

const StyledContainer = styled.div`
  position: relative;
`;

export class ServiceList extends Component {
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
      toggleServicesQuickActions
    } = this.props;

    if (loading && !forceArray(services).length) {
      return (
        <LayoutContainer center>
          <Loader />
        </LayoutContainer>
      );
    }

    const _err = error ? (
      <ErrorMessage
        title="Ooops!"
        message="An error occurred while loading your services."
      />
    ) : null;

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
        left: `${buttonRect.left +
          window.scrollX +
          (buttonRect.right - buttonRect.left) / 2}px`,
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

      renderedError = <ErrorMessage title="Ooops!" message={message} />;
    }

    const serviceList = sortBy(services, ['slug'])
      .map(service =>
        Object.assign(service, {
          metrics: !service.children
            ? processInstancesMetrics(service.instances)
            : null,
          children: service.children
            ? service.children.map(children =>
                Object.assign(children, {
                  metrics: processInstancesMetrics(children.instances)
                })
              )
            : null
        })
      )
      .map(service => (
        <ServiceListItem
          key={service.id}
          deploymentGroup={deploymentGroup.slug}
          service={service}
          onQuickActionsClick={handleQuickActionsClick}
        />
      ));

    return (
      <LayoutContainer>
        {renderedError}
        {_err}
        <StyledContainer>{serviceList}</StyledContainer>
      </LayoutContainer>
    );
  }
}

ServiceList.propTypes = {
  deploymentGroup: PropTypes.object,
  services: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  toggleServicesQuickActions: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  toggleServicesQuickActions: data => dispatch(toggleServicesQuickActions(data))
});

const UiConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withServiceMetricsGql({
    gqlQuery: ServicesQuery,
    graphDurationSeconds: GraphDurationSeconds,
    updateIntervalSeconds: 15,
    props: ({ deploymentGroup, loading, error }) => ({
      deploymentGroup,
      services: deploymentGroup
        ? processServices(deploymentGroup.services, null)
        : null,
      loading,
      error
    })
  }),
  withServiceMetricsPolling({
    pollingInterval: 1000,
    getPreviousEnd: ({ loading, error, services = [] }) => {
      if (loading) {
        return false;
      }

      const previousEnd = services
        .map(service => get(service, 'instances[0].metrics[0].end', null))
        .filter(Boolean)
        .shift();

      return (
        previousEnd ||
        moment()
          .utc()
          .format()
      );
    }
  }),
  UiConnect,
  withNotFound([GqlPaths.DEPLOYMENT_GROUP])
)(ServiceList);
