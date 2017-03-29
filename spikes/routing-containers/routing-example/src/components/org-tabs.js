import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class OrgTabs extends Component {

  render() {
    console.log('this.props = ', this.props);
    const {
      match
    } = this.props;

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Org tabs - will match for any '/:org' path</p>
        <p>Should display the org tabs</p>
        <p>Should be a connected component, getting the list of orgs</p>
      </div>
    )
  }
}

OrgTabs.propTypes = {
  match: PropTypes.object
}

export default OrgTabs;
