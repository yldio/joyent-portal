export default {
  resolvers: {
    Mutation: {
      updateHeader: (_, { isOpen, activePanel }, { cache }) => {
        cache.writeData({ data: { isOpen, activePanel } });
      }
    }
  },
  defaults: {
    isOpen: false,
    activePanel: ''
  }
};
