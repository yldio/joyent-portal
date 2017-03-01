import React from 'react';
import EmptyServices from '@components/empty/services';
import PropTypes from '@root/prop-types';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { H2 } from '@ui/components/base-elements';
import {
  FormGroup,
  Toggle,
  ToggleList,
  Legend
} from '@ui/components/form';
import styled from 'styled-components';
import { unitcalc } from '@ui/shared/functions';

const StyledLegend = styled(Legend)`
  float: left;
  padding-top: ${unitcalc(2)};
  margin-right: ${unitcalc(1.5)};
`;

const ServicesView = ({
  children,
  org = {},
  match = {},
  project = {},
  routerPush = {},
  services = []
}) => {
  const toggle = () => {
    if(!services) {
      return null;
    }

    const value = match.path === '/:org/projects/:projectId/services' ?
      'topology' : 'list';

    const onToggleChange = (evt) => {
      evt.preventDefault();
      const value = evt.target.value;
      const path = `/${org.id}/projects/${project.id}/services${
        value === 'list' ? '/list' : ''
      }`;
      routerPush(path);
    };

    return (
      <FormGroup name='service-view' value={value}>
        <StyledLegend>View</StyledLegend>
        <ToggleList>
          <Toggle value='topology' onChange={onToggleChange}>Topology</Toggle>
          <Toggle value='list' onChange={onToggleChange}>List</Toggle>
        </ToggleList>
      </FormGroup>
    );
  };

  const content = services.length ?
    children : <EmptyServices />;

  return (
    <Row>
      <Column xs={12}>
        <H2>Services</H2>
        { toggle() }
        { content }
      </Column>
    </Row>
  );
};

ServicesView.propTypes = {
  children: React.PropTypes.node,
  match: React.PropTypes.object.isRequired,
  org: PropTypes.org,
  project: PropTypes.project,
  routerPush: React.PropTypes.func.isRequired,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

export default ServicesView;
