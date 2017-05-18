import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PortalQuery from '@graphql/Portal.gql';
import ServicesQuery from '@graphql/ServicesTopology.gql';

import { processServices } from '@root/state/selectors';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';

import { colors } from '@ui/shared/constants';
import { unitcalc } from '@ui/shared/functions';
import { TopologyGraph } from '@ui/components/topology';
/*import ServicesTooltip from '@components/services/tooltip';

import { toggleTooltip } from '@state/actions';*/

const StyledBackground = styled.div`
  background-color: ${colors.base.whiteActive};
`;

const StyledContainer = styled.div`
  position: relative;
  padding: ${unitcalc(4)};
`;

const ServicesTopology = ({
  push,
  services,
  datacenter,
  loading,
  error
}) => {

  if(loading) {
    return (
      <LayoutContainer>
        <Loader />
      </LayoutContainer>
    )
  }
  else if(error) {
    return (
      <LayoutContainer>
        <ErrorMessage
          message='Oops, and error occured while loading your services.'
        />
      </LayoutContainer>
    )
  }

  return (
    <StyledBackground>
      <StyledContainer>
        <TopologyGraph
          services={services}
        />
      </StyledContainer>
    </StyledBackground>
  );
}

const PortalGql = graphql(PortalQuery, {});

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    }
  },
  props: ({ data: { deploymentGroup, loading, error }}) => ({
    services: deploymentGroup ?
      processServices(deploymentGroup.services, null) : null,
    loading,
    error
  })
});

const ServicesTopologyWithData = compose(
  PortalGql,
  ServicesGql
)(ServicesTopology);

export default ServicesTopologyWithData;
