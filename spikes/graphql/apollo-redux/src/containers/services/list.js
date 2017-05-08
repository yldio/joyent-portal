import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

class ServiceList extends Component {

  render() {

    const {
      location,
      services,
      loading,
      error
    } = this.props;

    const serviceList =
      loading ? <p>Loading...</p> :
      error ? <p>Error!!!</p> :
      services.map((service, index) =>
        <p key={index}>
          <Link
            to={`${location.pathname}/${service.id}/instances`}
          >
            {service.name}
          </Link>
        </p>);

    return (
      <div>
        <div>
          <h2>Service List</h2>
        </div>
        { serviceList }
      </div>
    );
  }
}

const services = gql`
  query Services($deploymentGroupId: String!){
    deploymentGroup(id: $deploymentGroupId) {
      services {
        uuid
        name
        id
      }
    }
  }
`;

const ServiceListWithData = graphql(services, {
  options(props) {
    return {
      variables: {
        deploymentGroupId: props.match.params.deploymentGroup
      }
    }
  },
  props: ({ data: { deploymentGroup, loading, error }}) => ({
    services: deploymentGroup ? deploymentGroup.services : null,
    loading,
    error
  })
})(ServiceList);

export default ServiceListWithData;
