import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends Component {

  render() {

    const {
      sections,
      matchUrl
    } = this.props;

    const menu = sections ?
      sections.map((s, i) =>
        <Link key={i} to={`${matchUrl}/${s.id}`}> {s.name} </Link>) : null;

    return (
      <div>
        <div>
          <h4>{menu}</h4>
        </div>
      </div>
    );
  }
}

const ConnectedMenu = connect(
  (state, ownProps) => {

    const params = ownProps.match.params;
    const matchUrl = ownProps.match.url;
    const deploymentGroupId = params.deploymentGroup;
    const serviceId = params.service;

    let sections;
    // To come from Redux store
    if(deploymentGroupId && serviceId) {
      sections = [{
        name: 'Metrics',
        id: 'metrics'
      }, {
        name: 'Single Metrics',
        id: 'single-metrics'
      }, {
        name: 'Instances',
        id: 'instances'
      }]
    }
    else if(deploymentGroupId) {
      sections = [{
        name: 'Services',
        id: 'services'
      }, {
        name: 'Instances',
        id: 'instances'
      }]
    }

    return {
      sections,
      matchUrl
    };
  },
  (dispatch) => ({})
)(Menu);

export default ConnectedMenu;
