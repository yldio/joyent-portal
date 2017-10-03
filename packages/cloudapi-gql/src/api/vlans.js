const { fetch } = require('./request');

module.exports.list = () => fetch('/:login/fabrics/default/vlans');
module.exports.get = ({ id }) => fetch(`/:login/fabrics/default/vlans/${id}`);

module.exports.create = ctx =>
  fetch(`/:login/fabrics/default/vlans`, {
    method: 'POST',
    body: ctx
  });

module.exports.update = ({ id, ...rest }) =>
  fetch(`/:login/fabrics/default/vlans/${id}`, {
    method: 'PUT',
    body: Object.assign({ id }, rest)
  });

module.exports.destroy = ({ id }) =>
  fetch(`/:login/fabrics/default/vlans/${id}`, {
    method: 'DELETE'
  });
