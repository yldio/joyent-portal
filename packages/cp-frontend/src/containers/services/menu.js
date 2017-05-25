import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Col, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';

import { LayoutContainer } from '@components/layout';
// import { EmptyServices } from '@components/services';
import {
  Button,
  H2,
  FormGroup,
  Input,
  Toggle,
  ToggleList,
  Legend
} from 'joyent-ui-toolkit';

// import { servicesForTopologySelector } from '@state/selectors';

const StyledLegend = Legend.extend`
  float: left;
  padding-top: ${unitcalc(2)};
  margin-right: ${unitcalc(1.5)};
`;

const PaddedRow = Row.extend`
  margin-bottom: ${remcalc(18)}
`;

const StyledForm = FormGroup.extend`
  width: 60%;
  float: left;
  margin: 0;
`;

// const StyledButton = styled(Button)`
//   margin-left: ${remcalc(48)};
// `;

const StyledFilter = styled(Input)`
  margin: 0;
`;

const handleAddService = () => console.log('Adding a service...');

const ServicesMenu = ({ location, history: { push } }) => {
  /* If(!services || !services.length) {
    return (
      <EmptyServices />
    );
  } */

  const toggleValue = location.pathname.split('-').pop();

  const handleToggle = evt => {
    const value = evt.target.value;
    if (value !== toggleValue) {
      const index = location.pathname.lastIndexOf('-');
      const path = `${location.pathname.slice(0, index)}-${value}`;
      push(path);
    }
  };

  return (
    <LayoutContainer>
      <H2>Services</H2>
      <PaddedRow>
        <Col xs={5}>
          <FormGroup name="service-view" value={toggleValue}>
            <StyledLegend>View</StyledLegend>
            <ToggleList>
              <Toggle value="topology" onChange={handleToggle}>Topology</Toggle>
              <Toggle value="list" onChange={handleToggle}>List</Toggle>
            </ToggleList>
          </FormGroup>
        </Col>
        <Col xs={5}>
          <StyledForm name="topology-filter">
            <StyledFilter placeholder="Filter" />
          </StyledForm>
        </Col>
        <Col xs={2}>
          <Button secondary onClick={handleAddService}>
            Add a service
          </Button>
        </Col>
      </PaddedRow>
    </LayoutContainer>
  );
};

ServicesMenu.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default ServicesMenu;
