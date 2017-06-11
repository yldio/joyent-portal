import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import DeploymentGroupsQuery from '@graphql/DeploymentGroups.gql';
import { Col, Row } from 'react-styled-flexboxgrid';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
import { EmptyDeployementGroups } from '@components/deployment-groups';
import { Button } from 'joyent-ui-toolkit';

const DeploymentGroupList = ({
  location,
  deploymentGroups,
  loading,
  error
}) => {
  if (loading) {
    return (
      <LayoutContainer>
        <Loader />
      </LayoutContainer>
    );
  } else if (error) {
    return (
      <LayoutContainer>
        <ErrorMessage message="Oops, and error occured while loading your deployment groups." />
      </LayoutContainer>
    );
  }

  let emptyDeployementGroups = null;
  let deploymentGroupList = null;

  if (deploymentGroups.length) {
    const list = deploymentGroups.map((deploymentGroup, index) => {
      return (
        <p key={index}>
          <Link to={`${location.pathname}/${deploymentGroup.slug}/services`}>
            {deploymentGroup.name}
          </Link>
        </p>
      );
    });

    deploymentGroupList = (
      <Row>
        <Col>
          <ul>
            {list}
          </ul>
        </Col>
      </Row>
    );
  } else {
    emptyDeployementGroups = <EmptyDeployementGroups />;
  }

  return (
    <LayoutContainer>
      {emptyDeployementGroups}
      <Row>
        <Col xs={12}>
          <Button to={`/deployment-groups/~create`}>
            Create new
          </Button>
        </Col>
      </Row>
      {deploymentGroupList}
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

const DeploymentGroupListWithData = graphql(DeploymentGroupsQuery, {
  options: {
    pollInterval: 1000
  },
  props: ({ data: { deploymentGroups, loading, error } }) => ({
    deploymentGroups,
    loading,
    error
  })
})(DeploymentGroupList);

export default DeploymentGroupListWithData;
