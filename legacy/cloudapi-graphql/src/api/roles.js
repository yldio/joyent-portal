const request = require('./request');

module.exports.list = () => {
  return request('listRoles');
};

module.exports.get = ctx => {
  return request('getRole', ctx);
};

module.exports.create = ctx => {
  return request('createRole', ctx);
};

module.exports.set = ctx => {
  const id = ctx.id ? `/${ctx.id}` : '';
  const resource = `/${request.client.account}/${ctx.resource}${id}`;

  return request('setRoleTags', {
    roleTags: ctx.role,
    resource
  });
};

module.exports.update = ctx => {
  return request('updateRole', ctx);
};

module.exports.destroy = ctx => {
  return request('deleteRole', ctx);
};
