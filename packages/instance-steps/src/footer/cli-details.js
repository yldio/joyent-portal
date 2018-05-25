const ForceArray = require('force-array');

export const generateTerraform = data => {
  const {
    name,
    package: pkg,
    image,
    affinity,
    metadata: _metadata,
    tags: _tags,
    firewall_enabled,
    networks
  } = formatData(data);

  const cns = ForceArray(
    (_tags.filter(({ name }) => name === 'triton.cns.services').pop() || {})
      .value
  );
  const userScript = (
    _metadata.filter(({ name }) => name === 'user-script').pop() || {}
  ).value;

  const tags = _tags.filter(({ name }) => !/^triton./.test(name));
  const metadata = _metadata.filter(({ name }) => name !== 'user-script');

  return (
    `resource "triton_machine" ${name} {
  name     = "${name}"
  package  = "${pkg}"
  image    = "${image}"
  networks = ["${networks.join('","')}"]
  firewall_enabled = ${Boolean(firewall_enabled)}` +
    `${
      affinity
        ? `
  affinity = ["${affinity}"]`
        : ''
    }` +
    `${
      userScript && userScript.length
        ? `\n
  user_script = "${userScript}"`
        : ''
    }` +
    `${
      cns.length
        ? `\n
  cns {
    services = ["${cns.join('", "')}"]
  }`
        : ''
    }` +
    `${
      tags.length
        ? `\n
  tags {
    ${tags.map(e => `${e.name} = "${e.value}"`).join('\n    ')}
  }`
        : ''
    }` +
    `${
      metadata.length
        ? `\n
  metadata {
    ${metadata.map(e => `${e.name} = "${e.value}"`).join('\n    ')}
  }`
        : ''
    }` +
    `\n}`
  );
};

export const generateCLI = data => {
  const {
    metadata,
    tags,
    firewall_enabled,
    networks,
    name,
    package: pkg,
    image
  } = data;

  const { affinity } = formatData(data);

  const _networks = `--network="${networks.join('","')}"`;
  const _affinity = affinity ? `--affinity="${affinity}"` : '';

  const _tags = tags.length
    ? `--tag=${JSON.stringify(
        tags.reduce((acc, t) => Object.assign(acc, { [t.name]: t.value }))
      )}`
    : '';

  const _metadata = metadata.length
    ? `--metadata=${JSON.stringify(
        metadata.reduce(
          (acc, m) => Object.assign(acc, { [m.name]: m.value }),
          {}
        )
      )}`
    : '';

  const _firewall = firewall_enabled ? `--firewall` : '';
  return `triton instance create -w --name=${name} ${_networks} ${_affinity} ${_tags} ${_metadata} ${_firewall} ${image} ${pkg}`;
};

const formatData = ({ affinity, metadata = [], tags = [], ...rest }) => ({
  affinity:
    affinity &&
    affinity.length &&
    `${affinity[0].key}${getAffinityOp(affinity[0].type)}${affinity[0].value}`,
  tags: tags.filter(
    e => e.name !== 'triton.cns.services' || e.name !== 'triton.cns.disable'
  ),
  metadata: metadata.filter(e => e.name !== 'user-script'),
  ...rest
});

const getAffinityOp = type => {
  switch (type.toUpperCase()) {
    case 'MUST_EQUAL':
      return '==';
    case 'MUST_NOT_EQUAL':
      return '!=';
    case 'SHOULD_EQUAL':
      return '==~';
    case 'SHOULD_NOT_EQUAL':
      return '!=~';
  }
};
