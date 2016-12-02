const React = require('react');

const renderLines = (props) => {
  return () => <line strokeWidth={2}></line>;
};

module.exports = (props) =>
  <g className='links'>
    { props.data.links.map(renderLines()) }
  </g>;
