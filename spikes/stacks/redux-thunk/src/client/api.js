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
