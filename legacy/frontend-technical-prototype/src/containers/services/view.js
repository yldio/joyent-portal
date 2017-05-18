import React from 'react';
import { connect } from 'react-redux';
import EmptyServices from '@components/empty/services';
import PropTypes from '@root/prop-types';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { LayoutContainer } from '@components/layout';
import { H2 } from '@ui/components/base-elements';
import { FormGroup, Toggle, ToggleList, Legend } from '@ui/components/form';
import TopologyFilter from '@components/services/topology-filter';
import { unitcalc, remcalc } from '@ui/shared/functions';
import styled from 'styled-components';

import {
  orgByIdSelector,
  projectByIdSelector,
  servicesForTopologySelector
} from '@state/selectors';

const StyledLegend = styled(Legend)`
  float: left;
  padding-top: ${unitcalc(2)};
  margin-right: ${unitcalc(1.5)};
`;

const PaddedRow = styled(Row)`
  margin-bottom: ${remcalc(18)}
`;

const ServicesView = ({
  org = {},
  project = {},
  services = {},
  location = {},
  match = {},
  push
}) => {

  if(!services || !services.length) {
    return (
      <EmptyServices />
    );
  }

  const toggleValue = location.pathname.split('-').pop();

  const handleToggle = (evt) => {

    const value = evt.target.value;
    if(value !== toggleValue) {
      const index = location.pathname.lastIndexOf('-');
      const path = `${location.pathname.slice(0, index)}-${value}`;
      push(path);
    }
  };

  const filter = (
    <Column xs={7}>
      <TopologyFilter services={services} project={project} />
    </Column>
  );

  const toggle = (
    <Column xs={5}>
      <FormGroup name='service-view' value={toggleValue}>
        <StyledLegend>View</StyledLegend>
        <ToggleList>
          <Toggle value='topology' onChange={handleToggle}>Topology</Toggle>
          <Toggle value='list' onChange={handleToggle}>List</Toggle>
        </ToggleList>
      </FormGroup>
    </Column>
  );

  return (
    <LayoutContainer>
      <Row>
        <Column xs={12}>
          <H2>Services</H2>
          <PaddedRow>
            { toggle }
            { filter }
          </PaddedRow>
        </Column>
      </Row>
    </LayoutContainer>
  );
};

ServicesView.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service),
  location: React.PropTypes.object,
  match: React.PropTypes.object,
  push: React.PropTypes.func.isRequired
};

const mapStateToProps = (state, {
  location,
  match,
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.project)(state),
  services: servicesForTopologySelector(match.params.project)(state),
  location: location,
  match: match,
  push: push
});

export default connect(
  mapStateToProps
)(ServicesView);
