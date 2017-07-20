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
          pathname: 'manifest/edit',
          name: 'Manifest'
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
