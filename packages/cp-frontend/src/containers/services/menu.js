import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';
import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';

import { H2, FormGroup, Toggle, ToggleList, Legend } from 'joyent-ui-toolkit';

const StyledLegend = Legend.extend`
  float: left;
  padding-top: ${unitcalc(2)};
  margin-right: ${unitcalc(1.5)};
`;

const PaddedRow = Row.extend`
  margin-bottom: ${remcalc(18)}
`;

const ServicesMenu = ({ location, history: { push } }) => {
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
    <LayoutContainer plain>
      <Title>Services</Title>
      <PaddedRow>
        <Col xs={5}>
          <FormGroup name="service-view" value={toggleValue}>
            <StyledLegend>View</StyledLegend>
            <ToggleList>
              <Toggle value="list" onChange={handleToggle}>
                List
              </Toggle>
              <Toggle value="topology" onChange={handleToggle}>
                Topology
              </Toggle>
            </ToggleList>
          </FormGroup>
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
