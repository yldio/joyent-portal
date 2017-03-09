import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import ServiceItem from '@components/service/item';
import UnmanagedInstances  from '@components/services/unmanaged-instances';
import { toggleTooltip } from '@state/actions';
import ServicesTooltip from '@components/services/tooltip';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector,
  serviceUiTooltipSelector
} from '@state/selectors';

const StyledContainer = styled.div`
  position: relative;
`;

class Services extends React.Component {

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
      toggleTooltip = (() => {}),
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

    const instances = 5;

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
      <div>
        { instances && <UnmanagedInstances instances={instances} /> }
        <StyledContainer>
          <div ref={this.ref('container')}>
            {serviceList}
            <ServicesTooltip {...uiTooltip} />
          </div>
        </StyledContainer>
      </div>
    );
  }
}

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service),
  toggleTooltip: React.PropTypes.func,
  uiTooltip: React.PropTypes.object
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesByProjectIdSelector(match.params.projectId)(state),
  uiTooltip: serviceUiTooltipSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleTooltip: (data) => dispatch(toggleTooltip(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);
