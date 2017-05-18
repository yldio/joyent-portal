import React, { Component, PropTypes} from 'react';

class AppHeader extends Component {

  render() {
    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>App Header - should contain logo and profile to the right, to be a connected comp, it will always be matched</p>
      </div>
    )
  }
}

AppHeader.propTypes = {
  children: PropTypes.node
}

export default AppHeader;
