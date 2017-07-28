import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row } from 'react-styled-flexboxgrid';
import forceArray from 'force-array';
import remcalc from 'remcalc';

import { LayoutContainer } from '@components/layout';
import { Title } from '@components/navigation';
import { ErrorMessage, Loader } from '@components/messaging';
import DeploymentGroupsQuery from '@graphql/DeploymentGroups.gql';
import DeploymentGroupsImportableQuery from '@graphql/DeploymentGroupsImportable.gql';
import { H2, H3, Small, IconButton, BinIcon } from 'joyent-ui-toolkit';

const DGsRows = Row.extend`
  margin-top: ${remcalc(-7)};
`;

const Box = styled.div`
  position: relative;
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

const StyledLink = styled(Link)`
  display: flex;
  flex-grow: 1;
  text-decoration: none;
  color: ${props => props.theme.secondary};
`;

const StyledCreateLink = styled(StyledLink)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;

  &:hover,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${props => props.theme.white};
  }
`;

const DeploymentGroupList = ({
  location,
  deploymentGroups,
  importable,
  loading,
  error,
  match
}) => {
  const _title = <Title>Deployment groups</Title>;

  if (loading) {
    return (
      <LayoutContainer center>
        {_title}
        <Loader />
      </LayoutContainer>
    );
  }

  if (error) {
    return (
      <LayoutContainer>
        {_title}
        <ErrorMessage message="Oops, and error occured while loading your deployment groups." />
      </LayoutContainer>
    );
  }

  const groups = forceArray(deploymentGroups).map(({ slug, name }) =>
    <Col xs={12} sm={4} md={3} lg={3} key={slug}>
      <Box>
        <StyledLink to={`${match.path}/${slug}`}>
          <ServiceTitle>
            {name}
          </ServiceTitle>
        </StyledLink>
        <StyledIconButton to={`${match.url}/${slug}/delete`}>
          <BinIcon />
        </StyledIconButton>
      </Box>
    </Col>
  );

  const create = [
    <Col xs={12} sm={4} md={3} lg={3} key="~create">
      <BoxCreate>
        <StyledCreateLink to={`${match.path}/~create`}>
          <Oval>+</Oval>
          <CreateTitle>Create new deployment group</CreateTitle>
        </StyledCreateLink>
      </BoxCreate>
    </Col>
  ].concat(
    forceArray(importable).map(({ slug, name }) =>
      <Col xs={12} sm={4} md={3} lg={3} key={slug}>
        <BoxCreate>
          <StyledCreateLink to={`${match.path}/~import/${slug}`}>
            <Oval>&#10549;</Oval>
            <CreateTitle>
              {name}
            </CreateTitle>
          </StyledCreateLink>
        </BoxCreate>
      </Col>
    )
  );

  return (
    <LayoutContainer>
      {_title}
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
      deploymentGroups:
        deploymentGroups && deploymentGroups.length
          ? deploymentGroups.filter(dg => dg.status !== 'DELETED')
          : null,
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
