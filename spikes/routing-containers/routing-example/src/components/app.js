import React, { Component, PropTypes} from 'react';

class App extends Component {

  render() {
    console.log('App.render children');
    return (
      <div style={{border: '1px solid black', margin: '2px', padding: '2px'}}>
        <p>App container - will just do layout shizzle and contain all</p>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App;
