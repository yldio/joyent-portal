import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class ProjectList extends Component {

  render() {

    const {
      location,
      deploymentGroups,
      loading,
      error
    } = this.props;

    const projectList =
      loading ? <p>Loading...</p> :
      error ? <p>Error!!!</p> :
      deploymentGroups.map((deploymentGroup, index) =>
        <p key={index}>
          <Link
            to={`${location.pathname}/${deploymentGroup.uuid}/services`}
          >
            {deploymentGroup.name}
          </Link>
        </p>);

    return (
      <div>
        <div>
          <h2>Project List</h2>
        </div>
        { projectList }
      </div>
    );
  }
}

const projects = gql`
  query {
    deploymentGroups {
      uuid
      name
    }
  }
`;

const ProjectListWithData = graphql(projects, {
  props: ({ data: deploymentGroups, loading, error }) => ({
    deploymentGroups,
    loading,
    error
  })
})(ProjectList)

export default ProjectListWithData;
