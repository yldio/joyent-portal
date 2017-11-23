import React from 'react';

export default ({ instance, packages, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <pre>{JSON.stringify({ instance, packages }, null, 2)}</pre>;
  </form>
);
