export default ({ graphQLErrors = [], message = '' }) =>
  graphQLErrors.length
    ? graphQLErrors.map(({ message }) => message).join('\n')
    : message;