const React = require('react');

const renderLines = (props) => {
    return () => <line strokeWidth={2}></line>;
};

module.exports = (props) =>
  <g className='links' key='links'>
    { props.data.links.map((link, index) => {
      console.log('link = ', link);
      console.log('index = ', index);
      return <line strokeWidth={2}></line>
    })
  }
  </g>;
