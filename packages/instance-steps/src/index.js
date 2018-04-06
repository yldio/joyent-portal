import forceArray from 'force-array';
import constantCase from 'constant-case';
import get from 'lodash.get';
import uniqBy from 'lodash.uniqby';
import omit from 'lodash.omit';

const parseAffRule = ({
  conditional,
  placement,
  type: identity,
  name,
  pattern,
  value
}) => {
  const type = constantCase(
    `${conditional}_${placement === 'same' ? 'equal' : 'not_equal'}`
  );

  const patterns = {
    equalling: value => value,
    starting: value => `/^${value}/`
  };

  const _name = identity === 'name' ? 'instance' : name;
  const _value = patterns[pattern](type === 'name' ? name : value);

  return {
    type,
    key: _name,
    value: _value
  };
};

export const generatePayload = steps => {
  const name = get(steps, 'name.name', '').toLowerCase();
  const image = get(steps, 'image.id', '');
  const pkg = get(steps, 'package.id', '');

  const networks = forceArray(get(steps, 'networks', []))
    .map(({ id }) => id)
    .filter(Boolean);

  const tags = forceArray(get(steps, 'tags', [])).map(t => omit(t, 'expanded'));
  const metadata = forceArray(get(steps, 'metadata', [])).map(m =>
    omit(m, 'open')
  );

  const userScript = get(steps, 'user-script', { lines: 0 });
  const firewall_enabled = get(steps, 'firewall.enabled', false);
  const cns = get(steps, 'cns', { cnsEnabled: false, serviceNames: [] });

  const affinity = steps.affinity
    ? forceArray(parseAffRule(steps.affinity))
    : [];

  if (userScript.lines) {
    metadata.push({
      name: 'user-script',
      value: userScript.script
    });
  }

  tags.push({
    name: 'triton.cns.disable',
    value: !cns.cnsEnabled
  });

  if (cns.serviceNames.length) {
    metadata.push({
      name: 'triton.cns.services',
      value: cns.serviceNames.join(',')
    });
  }

  return {
    name,
    package: pkg,
    image,
    affinity,
    metadata: uniqBy(metadata, 'name'),
    tags: uniqBy(tags, 'name'),
    firewall_enabled,
    networks: networks.length ? networks : undefined
  };
};

export { default as Name } from './name';
export { default as Image } from './image';
export { default as Package } from './package';
export { default as Networks } from './networks';
export { default as Tags } from './tags';
export { default as Metadata } from './metadata';
export { default as UserScript } from './user-script';
export { default as Firewall, Preview as FirewallPreview } from './firewall';
export { default as CNS, Preview as CnsPreview } from './cns';
export { default as Affinity } from './affinity';
