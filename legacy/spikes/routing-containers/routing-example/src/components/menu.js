import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

  render() {
    console.log('Menu this.props = ', this.props);
    const {
      match
    } = this.props;

    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>Menu - will match for any '/:org' path</p>
        <p>Should be an intelligent component, that will use the params from the path to get the sections data needed to display the links</p>
        <p>Should be a connected component, see above</p>
        <p>
          <Link to={`${match.url}/projects`}>Projects</Link> |
          <Link to={`${match.url}/people`}> People - should not show for personal org</Link> |
          <Link to={`${match.url}/settings`}> Settings</Link>
        </p>
        <p>This component can also redirect to /:org/projects by default, and when /:org/people is hit on a personal org</p>
        {this.props.children}
      </div>
    )
  }
}

Menu.propTypes = {
  children: PropTypes.node,
  match: PropTypes.object
}

export default Menu;
