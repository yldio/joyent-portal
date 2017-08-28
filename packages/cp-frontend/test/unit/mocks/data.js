export const instance = {
  id: '309ecd9f-ac03-474b-aff7-4bd2e743296c',
  name: 'wordpress_01',
  serviceId: 'be227788-74f1-4e5b-a85f-b5c71cbae8d8',
  deploymentGroupId: 'e0ea0c02-55cc-45fe-8064-3e5176a59401',
  machineId: '011f7479-2d45-442d-99bf-7f6216954cc8',
  status: 'RUNNING',
  healthy: 'HEALTHY'
};

export const service = {
  id: '081a792c-47e0-4439-924b-2efa9788ae9e',
  slug: 'nginx',
  name: 'Nginx',
  deploymentGroupId: 'e0ea0c02-55cc-45fe-8064-3e5176a59401',
  connections: ['be227788-74f1-4e5b-a85f-b5c71cbae8d8'],
  instances: [instance],
  instanceStatuses: [{ status: 'RUNNING', count: 1 }]
};

export const deploymentGroup = {
  id: 'e0ea0c02-55cc-45fe-8064-3e5176a59401',
  slug: 'wordpress-blog-example',
  name: 'Wordpress Blog Example'
};

export const services = [service];

export const instances = [instance];

export const deploymentGroups = [deploymentGroup];
