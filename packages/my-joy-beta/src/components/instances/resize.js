import React from 'react';
import ReactJson from 'react-json-view';

export default ({ instance, packages, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <ReactJson src={{ instance, packages }} />
  </form>
);
