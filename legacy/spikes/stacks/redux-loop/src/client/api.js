var fetch = require('graphql-fetch')(`${document.location.origin}/graphql`);

exports.fetchChanges = () => {
  return fetch(`
    query {
      changes {
        id,
        product {
          id,
          artist,
          title,
          label,
          format,
          price,
          currency
        },
        price,
        currency
      }
    }
  `).then(({
    data
  }) => {
    return data.changes;
  });
};

exports.removeChange = (id) => {
  console.log(`
  mutation {
    removeChange(id: "${id}")
  }
`);
  return fetch(`
    mutation {
      removeChange(id: "${id}") {
        id
      }
    }
  `).then(({
    errors
  }) => {
    if (!errors) {
      return;
    }

    throw new Error(errors[0].message);
  });
};
