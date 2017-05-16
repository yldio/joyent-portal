import React from 'react';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PortalQuery from '@graphql/Portal.gql';
import ServicesQuery from '@graphql/ServicesTopology.gql';

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

  console.log('push = ', push);
  console.log('services = ', services);
  console.log('datacenter = ', datacenter);
  console.log('loading = ', loading);
  console.log('error = ', error);

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

  const findService = (ss, uuid) =>
    ss.reduce((s, service) => service.uuid === uuid ?
      service : s, null);

  const getService = (s, i) => ({
    index: i,
    ...s,
    metrics: s.currentMetrics.map((m) => ({
        name: m.name,
        value: `${m.value}${m.measurement}`
      })),
    instances: s.instances.length,
    datacenter: datacenter
  });

  // Selector???
  const ss = services.reduce((ss, s, i) => {
    // check whether it exits in thing, if so, add as child
    // if not, create and add as child

    if(s.parent) {
      let parent = findService(ss, s.parent);
      if(!parent) {
        parent = { uuid: s.parent };
        ss.push(parent);
      }
      if(!parent.children) {
        parent.children = [];
      }
      parent.children.push(getService(s, i));
    }
    if(!s.parent) {
      ss.push(getService(s, i));
    }
    return ss;
  }, []);

  return (
    <StyledBackground>
      <StyledContainer>
        <TopologyGraph
          services={ss}
        />
      </StyledContainer>
    </StyledBackground>
  );
}

const PortalGql = graphql(PortalQuery, {
  props: ({ data: { portal, loading, error }}) => ({
    datacenter: portal ? portal.datacenter.id : null,
    loading,
    error
  })
})

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupPathName: props.match.params.deploymentGroup
      }
    }
  },
  props: ({ data: { deploymentGroup, loading, error }}) => ({
    services: deploymentGroup ? deploymentGroup.services : null,
    loading,
    error
  })
});

const ServicesTopologyWithData = compose(
  PortalGql,
  ServicesGql
)(ServicesTopology);

export default ServicesTopologyWithData;
