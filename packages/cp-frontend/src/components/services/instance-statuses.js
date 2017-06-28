import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { P } from 'joyent-ui-toolkit';

const StyledStatus = P.extend`
  margin: 0;
  font-size: ${remcalc(13)};
  line-height: ${remcalc(13)};
`;

const StyledStatusContainer = styled.div`
  margin: ${remcalc(6)} 0 ${remcalc(12)} 0;
  height: ${remcalc(54)}
`;

const InstanceStatuses = ({ instances }) => {
  const statuses = instances.reduce((statuses, instance) => {
    if (instance.status !== 'RUNNING') {
      if (statuses[instance.status]) {
        statuses[instance.status]++;
      } else {
        statuses[instance.status] = 1;
      }
    }
    return statuses;
  }, {});

  const instanceStatuses = Object.keys(statuses).map(status => {
    const instances = statuses[status];
    return (
      <StyledStatus>
        {`${instances}
          ${instances > 1 ? 'instances' : 'instance'}
          ${status.toLowerCase()}`}
      </StyledStatus>
    );
  });

  return (
    <StyledStatusContainer>
      {instanceStatuses}
    </StyledStatusContainer>
  );
};

InstanceStatuses.propTypes = {
  instances: PropTypes.array.isRequired
};

export default InstanceStatuses;
