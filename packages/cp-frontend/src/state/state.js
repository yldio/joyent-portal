const state = {
  ui: {
    sections: {
      deploymentGroups: [
        {
          pathname: 'services',
          name: 'Services'
        },
        {
          pathname: 'instances',
          name: 'Instances'
        },
        {
          pathname: 'manifest',
          name: 'Manifest'
        },
        {
          pathname: 'rollback',
          name: 'Rollback'
        }
      ],
      services: [
        {
          pathname: 'instances',
          name: 'Instances'
        }
      ]
    },
    services: {
      quickActions: {
        show: false
      }
    }
  }
};

export default state;
