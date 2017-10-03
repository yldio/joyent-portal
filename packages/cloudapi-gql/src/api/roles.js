const request = require('./request');

module.exports.list = () => request('listRoles');

module.exports.get = ({ id, name }) =>
  request.fetch(`/:login/roles/${id || name}`);

module.exports.create = ctx => request('createRole', ctx);

module.exports.set = ctx => {
  const id = ctx.id ? `/${ctx.id}` : '';
  const resource = `/${request.client.account}/${ctx.resource}${id}`;

  return request('setRoleTags', {
    roleTags: ctx.role,
    resource
  });
};

module.exports.update = ctx => request('updateRole', ctx);
module.exports.destroy = ctx => request('deleteRole', ctx);
