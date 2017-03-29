import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class Projects extends Component {

  render() {
    console.log('Projects this.props = ', this.props);
    const {
      match
    } = this.props;

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Projects</p>
        <p><Link to={`${match.url}/project-judit/services`}>A project called Judit</Link></p>
      </div>
    )
  }
}

Projects.propTypes = {
  children: PropTypes.node
}

export default Projects;
