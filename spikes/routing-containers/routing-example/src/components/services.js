import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class Services extends Component {

  render() {

    const {
      match
    } = this.props;

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Services Topology view</p>
        <p>Obvs. connected, getting services topology data</p>
        <p><Link to={`${match.url}/list`}>List view</Link></p>
      </div>
    )
  }
}

Services.propTypes = {
  children: PropTypes.node
}

export default Services;
