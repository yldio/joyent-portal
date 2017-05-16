import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { LayoutContainer } from '@components/layout';
import { EmptyServices } from '@components/services';

import { unitcalc, remcalc } from '@ui/shared/functions';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { FormGroup, Input, Toggle, ToggleList, Legend } from '@ui/components/form';
import { H2 } from '@ui/components/base-elements';
import Button from '@ui/components/button';

import {
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

const StyledForm = styled(FormGroup)`
  width: 60%;
  float: left;
  margin: 0;
`;

const StyledButton = styled(Button)`
  margin-left: ${remcalc(48)};
`;

const StyledFilter = styled(Input)`
  margin: 0;
`;

const handleAddService = () => console.log('Adding a service...');

const ServicesMenu = ({
  location,
  history: {
    push
  }
}) => {

  /*if(!services || !services.length) {
    return (
      <EmptyServices />
    );
  }*/

  const toggleValue = location.pathname.split('-').pop();

  const handleToggle = (evt) => {

    const value = evt.target.value;
    if(value !== toggleValue) {
      const index = location.pathname.lastIndexOf('-');
      const path = `${location.pathname.slice(0, index)}-${value}`;
      push(path);
    }
  };

  return (
    <LayoutContainer>
      <H2>Services</H2>
      <PaddedRow>
        <Column xs={5}>
          <FormGroup name='service-view' value={toggleValue}>
            <StyledLegend>View</StyledLegend>
            <ToggleList>
              <Toggle value='topology' onChange={handleToggle}>Topology</Toggle>
              <Toggle value='list' onChange={handleToggle}>List</Toggle>
            </ToggleList>
          </FormGroup>
        </Column>
        <Column xs={5}>
          <StyledForm name='topology-filter'>
            <StyledFilter
              placeholder='Filter'
            />
          </StyledForm>
        </Column>
        <Column xs={2}>
          <Button
            secondary
            onClick={handleAddService}
          >
            Add a service
          </Button>
        </Column>
      </PaddedRow>
    </LayoutContainer>
  );
};

ServicesMenu.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default ServicesMenu;
