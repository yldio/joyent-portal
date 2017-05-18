import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {

  render() {
    console.log('Breadcrumb this.props = ', this.props);
    const {
      match
    } = this.props;

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Breadcrumb - will match for any '/:org' path</p>
        <p>Should contain the breadcrumb</p>
        <p>Should be a connected component, getting as much of the data as needed (some trickery with selectors to return null if no id supplied)</p>
      </div>
    )
  }
}

Breadcrumb.propTypes = {
  match: PropTypes.object
}

export default Breadcrumb;
