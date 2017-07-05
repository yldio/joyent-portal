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

const InstanceStatuses = ({ instanceStatuses }) => {
  const statuses = instanceStatuses.map(instanceStatus => {
    const { status, count } = instanceStatus;

    return (
      <StyledStatus>
        {`${count}
          ${count > 1 ? 'instances' : 'instance'}
          ${status.toLowerCase()}`}
      </StyledStatus>
    );
  });

  return (
    <StyledStatusContainer>
      {statuses}
    </StyledStatusContainer>
  );
};

InstanceStatuses.propTypes = {
  instanceStatuses: PropTypes.array.isRequired
};

export default InstanceStatuses;
