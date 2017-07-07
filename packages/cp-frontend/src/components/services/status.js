import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { StatusLoader, P } from 'joyent-ui-toolkit';

const StyledStatusContainer = styled.div`
  display: inline-block;
  margin: 0;
  height: ${remcalc(54)};
  width: ${remcalc(200)};
`;

const StyledStatus = P.extend`
  margin: 0;
  font-size: ${remcalc(13)};
  line-height: ${remcalc(13)};
`;

const StyledTransitionalStatus = StyledStatus.extend`
  display: inline-block;
  margin-left: ${remcalc(6)};
  text-transform: capitalize;
`;

const ServiceStatus = ({ service }) => {

  const getInstanceStatuses = (instanceStatuses) =>
    instanceStatuses.map((instanceStatus, index) => {
      const { status, count } = instanceStatus;

      return (
        <StyledStatus key={index}>
          {`${count}
            ${count > 1 ? 'instances' : 'instance'}
            ${status.toLowerCase()}`}
        </StyledStatus>
      );
    });

  return service.transitionalStatus
    ? (
      <StyledStatusContainer>
        <StatusLoader />
        <StyledTransitionalStatus>
          { service.status ? service.status.toLowerCase() : '' }
        </StyledTransitionalStatus>
      </StyledStatusContainer>
    )
    : (
      <StyledStatusContainer>
        {getInstanceStatuses(service.instanceStatuses)}
      </StyledStatusContainer>
    );
};

ServiceStatus.propTypes = {
  service: PropTypes.object.isRequired
};

export default ServiceStatus;
