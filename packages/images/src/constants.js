import {
  Linux,
  Freebsd,
  Illumos,
  Smart,
  Windows,
  Placeholder
} from 'joyent-logo-assets';

export const ImageType = {
  ZONE_DATASET: 'Hardware Virtual Machine',
  LX_DATASET: 'Infrastructure Container',
  ZVOL: 'Hardware Virtual Machine',
  DOCKER: 'Docker Container',
  OTHER: 'Hardware Virtual Machine'
};
export const OS = {
  SMARTOS: Smart,
  LINUX: Linux,
  WINDOWS: Windows,
  BSD: Freebsd,
  ILLUMOS: Illumos,
  OTHER: Placeholder
};
