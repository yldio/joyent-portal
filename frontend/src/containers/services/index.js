import React from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from '@root/prop-types';
import ServicesView from '@components/services/view';
import Button from '@ui/components/button';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector
} from '@state/selectors';

const Services = (props) => {
  const {
    org = {},
    project = {},
    services = [],
    children,
    path,
    push
  } = props;


  // TODO: Move into "components" and fix absolute
  // positioning on responsive screens
  const instances = (instances = 0) => {

    const StyledButton = Styled(Button)`
      position: absolute;
      top: 340px;
      right: 193px;
    `;

    if ( instances.length <= 0 || instances <= 0 ) return;
    return (
      <StyledButton tertiary>
        You have 5 instances
      </StyledButton>
    );
  };

  const toggleValue = path === '/:org/projects/:projectId/services' ?
    'topology' : 'list';

  const onToggle = (value) => {
    const path = `/${org.id}/projects/${project.id}/services${
      value === 'list' ? '/list' : ''
    }`;
    push(path);
  };

  return (
    <ServicesView
      onToggle={onToggle}
      toggleValue={toggleValue}
      services={services}
    >
      { instances() }
      {children}
    </ServicesView>
  );
};

Services.propTypes = {
  children: React.PropTypes.node,
  org: PropTypes.org,
  path: React.PropTypes.string.isRequired,
  project: PropTypes.project,
  push: React.PropTypes.func.isRequired,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  match = {
    params: {},
    path: ''
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  services: servicesForTopologySelector(match.params.projectId)(state),
  path: match.path,
  push: push
});

export default connect(
  mapStateToProps
)(Services);
