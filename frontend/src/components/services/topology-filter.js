import React from 'react';
import styled from 'styled-components';

import {
  FormGroup,
  Input
} from '@ui/components/form';

import Button from '@ui/components/button';
import { remcalc } from '@ui/shared/functions';


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

const TopologyFilter = ({
  services = [],
  projects = []
}) => {

  return (
    <div>
      <StyledForm name='topology-filter'>
        <StyledFilter
          placeholder='Filter'
          services={services}
        />
      </StyledForm>

      <StyledButton
        secondary
        onClick={handleAddService}
      >
        Add A Service
      </StyledButton>
    </div>
  );
};

TopologyFilter.propTypes = {
  projects: React.PropTypes.array,
  services: React.PropTypes.array
};

export default TopologyFilter;
