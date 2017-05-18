import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class ServicesList extends Component {

  render() {

    const {
      match
    } = this.props;

    console.log('this.props = ', this.props);
    const path = match.url.replace('/list', '');

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Services List view</p>
        <p>Obvs. connected, getting services data</p>
        <p><Link to={path}>Topology view</Link></p>
      </div>
    )
  }
}

ServicesList.propTypes = {
  children: PropTypes.node
}

export default ServicesList;
