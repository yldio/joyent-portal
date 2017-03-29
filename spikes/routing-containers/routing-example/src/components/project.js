import React, { Component, PropTypes} from 'react';

class Project extends Component {

  render() {
    console.log('Project this.props = ', this.props);
    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Project</p>
        {this.props.children}
      </div>
    )
  }
}

Project.propTypes = {
  children: PropTypes.node
}

export default Project;
