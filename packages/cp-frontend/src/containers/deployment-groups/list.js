import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';
import remcalc from 'remcalc';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { DeploymentGroupsLoading } from '@components/deployment-groups';
import DeploymentGroupsQuery from '@graphql/DeploymentGroups.gql';
import DeploymentGroupsImportableQuery from '@graphql/DeploymentGroupsImportable.gql';
import { Button, H2, H3, Small } from 'joyent-ui-toolkit';

const Title = H2.extend`
  margin-top: ${remcalc(2)};
`;

const DGsRows = Row.extend`
  margin-top: ${remcalc(-7)};
`;

const Box = Col.withComponent(Link).extend`
  text-decoration: none;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.white};
  box-shadow: 0 ${remcalc(2)} 0 0 rgba(0, 0, 0, 0.05);
  border: solid ${remcalc(1)} ${props => props.theme.grey};
  margin-top: ${remcalc(20)};
  margin-bottom: 0;
  padding: ${remcalc(18)};
  min-height: ${remcalc(258)};
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: ${remcalc(20)};
  }
`;

const BoxCreate = Box.extend`
  background-color: ${props => props.theme.disabled};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;

  &:hover {
    background-color: ${props => props.theme.white};
  }
`;

const Oval = styled.div`
  border: solid ${remcalc(1)} ${props => props.theme.grey};
  border-radius: 50%;

  width: ${remcalc(48)};
  height: ${remcalc(48)};
  line-height: ${remcalc(48)};
  font-size: ${remcalc(24)};
  text-align: center;

  margin-bottom: ${remcalc(20)};
`;

const CreateTitle = Small.extend`
  font-weight: 600;
  text-align: center;
`;

const ServiceTitle = H3.extend`
  margin-top: ${remcalc(10)};
  font-weight: 600;
`;

const DeploymentGroupList = ({
  location,
  deploymentGroups,
  importable,
  loading,
  error,
  match
}) => {
  const _loading = !loading ? null : <DeploymentGroupsLoading />;

  // todo improve this error message style according to new designs
  const _error = !error
    ? null
    : <Row>
        <ErrorMessage message="Oops, and error occured while loading your deployment groups." />
      </Row>;

  const groups = forceArray(deploymentGroups).map(({ slug, name }) =>
    <Col xs={12} sm={4} md={3} lg={3} key={slug}>
      <Box to={`${match.path}/${slug}`}>
        <ServiceTitle>{name}</ServiceTitle>
      </Box>
    </Col>
  );

  const create = [
    <Col xs={12} sm={4} md={3} lg={3} key="~create">
      <BoxCreate to={`${match.path}/~create`}>
        <Oval>+</Oval>
        <CreateTitle>Create new deployment group</CreateTitle>
      </BoxCreate>
    </Col>
  ].concat(
    forceArray(importable).map(({ slug, name }) =>
      <Col xs={12} sm={4} md={3} lg={3} key={slug}>
        <BoxCreate to={`${match.path}/~import/${slug}`}>
          <Oval>&#10549;</Oval>
          <CreateTitle>{name}</CreateTitle>
        </BoxCreate>
      </Col>
    )
  );

  return (
    <LayoutContainer>
      <Title>Deployment groups</Title>
      {_loading}
      {_error}
      <DGsRows>
        {groups}
        {create}
      </DGsRows>
    </LayoutContainer>
  );
};

DeploymentGroupList.propTypes = {
  deploymentGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

export default compose(
  graphql(DeploymentGroupsQuery, {
    options: {
      pollInterval: 1000
    },
    props: ({ data: { deploymentGroups, loading, error } }) => ({
      deploymentGroups,
      loading,
      error
    })
  }),
  graphql(DeploymentGroupsImportableQuery, {
    props: ({ data: { importableDeploymentGroups } }) => ({
      importable: importableDeploymentGroups
    })
  })
)(DeploymentGroupList);
