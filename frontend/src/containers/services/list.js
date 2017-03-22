import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import { LayoutContainer } from '@components/layout';
import ServiceItem from '@components/service/item';
import UnmanagedInstances  from '@components/services/unmanaged-instances';
import { toggleTooltip } from '@state/actions';
import ServicesTooltip from '@components/services/tooltip';
import { subscribeMetric } from '@state/thunks';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector,
  serviceUiTooltipSelector
} from '@state/selectors';

const StyledContainer = styled.div`
  position: relative;
`;

// TMP - single source of truth
const duration = '1 hour';
const interval = '2 minutes';

class Services extends React.Component {

  // we DON'T want to unsubscribe once we started going
  componentWillMount() {
    this.props.subscribeMetric(interval);
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {
    const {
      org = {},
      project = {},
      services = [],
      toggleTooltip = () => ({}),
      uiTooltip = {}
    } = this.props;

    const onQuickActions = (evt, service) => {
      const list = this._refs.container;
      const listRect = list.getBoundingClientRect();
      const button = evt.currentTarget;
      const buttonRect = button.getBoundingClientRect();

      const position = {
        left: buttonRect.left - listRect.left
          + (buttonRect.right - buttonRect.left)/2,
        top: buttonRect.bottom - listRect.top
      };

      toggleTooltip({
        service: service,
        position: position
      });
    };

    const instances = null;

    const serviceList = services.map((service) => (
      <ServiceItem
        key={service.uuid}
        onQuickActions={onQuickActions}
        org={org.id}
        project={project.id}
        service={service}
        uiTooltip={uiTooltip}
      />
    ));

    return (
      <LayoutContainer>
        { instances && <UnmanagedInstances instances={instances} /> }
        <StyledContainer>
          <div ref={this.ref('container')}>
            {serviceList}
            <ServicesTooltip {...uiTooltip} />
          </div>
        </StyledContainer>
      </LayoutContainer>
    );
  }
}

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service),
  toggleTooltip: React.PropTypes.func,
  uiTooltip: React.PropTypes.object,
  subscribeMetric: React.PropTypes.func
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesByProjectIdSelector(match.params.projectId, {
    duration,
    interval
  })(state),
  uiTooltip: serviceUiTooltipSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleTooltip: (data) => dispatch(toggleTooltip(data)),
  subscribeMetric: (payload) => dispatch(subscribeMetric(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
