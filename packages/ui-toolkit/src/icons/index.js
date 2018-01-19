import React from 'react';
import { withTheme } from 'styled-components';

import Baseline from '../baseline';

import {
  Actions as BaseActions,
  Affinity as BaseAffinity,
  Arrow as BaseArrow,
  Bin as BaseBin,
  Checkcircle as BaseCheckcircle,
  Clipboard as BaseClipboard,
  Close as BaseClose,
  Cns as BaseCns,
  Copy as BaseCopy,
  Cpu as BaseCpu,
  DataCenter as BaseDataCenter,
  Delete as BaseDelete,
  Dot as BaseDot,
  Duplicate as BaseDuplicate,
  Edit as BaseEdit,
  Fabric as BaseFabric,
  Firewall as BaseFirewall,
  General as BaseGeneral,
  Health as BaseHealth,
  Id as BaseId,
  Import as BaseImport,
  InstanceCount as BaseInstanceCount,
  InstanceType as BaseInstanceType,
  Instances as BaseInstances,
  Loading as BaseLoading,
  Login as BaseLogin,
  Memory as BaseMemory,
  Metadata as BaseMetadata,
  Minus as BaseMinus,
  Name as BaseName,
  Network as BaseNetwork,
  Package as BasePackage,
  Plus as BasePlus,
  Private as BasePrivate,
  Public as BasePublic,
  Randomize as BaseRandomize,
  Reset as BaseReset,
  Restart as BaseRestart,
  Script as BaseScript,
  Services as BaseServices,
  Start as BaseStart,
  Stop as BaseStop,
  Storage as BaseStorage,
  Tags as BaseTags,
  Triton as BaseTriton,
  User as BaseUser
} from 'joyent-icons';

const Colors = Component =>
  withTheme(({ theme = {}, ...rest }) => (
    <Component {...rest} colors={theme} />
  ));

export const Actions = Baseline(Colors(BaseActions));
export const Affinity = Baseline(Colors(BaseAffinity));
export const Arrow = Baseline(Colors(BaseArrow));
export const Bin = Baseline(Colors(BaseBin));
export const Checkcircle = Baseline(Colors(BaseCheckcircle));
export const Clipboard = Baseline(Colors(BaseClipboard));
export const Close = Baseline(Colors(BaseClose));
export const Cns = Baseline(Colors(BaseCns));
export const Copy = Baseline(Colors(BaseCopy));
export const Cpu = Baseline(Colors(BaseCpu));
export const DataCenter = Baseline(Colors(BaseDataCenter));
export const Delete = Baseline(Colors(BaseDelete));
export const Dot = Baseline(Colors(BaseDot));
export const Duplicate = Baseline(Colors(BaseDuplicate));
export const Edit = Baseline(Colors(BaseEdit));
export const Fabric = Baseline(Colors(BaseFabric));
export const Firewall = Baseline(Colors(BaseFirewall));
export const General = Baseline(Colors(BaseGeneral));
export const Health = Baseline(Colors(BaseHealth));
export const Id = Baseline(Colors(BaseId));
export const Import = Baseline(Colors(BaseImport));
export const InstanceCount = Baseline(Colors(BaseInstanceCount));
export const InstanceType = Baseline(Colors(BaseInstanceType));
export const Instances = Baseline(Colors(BaseInstances));
export const Loading = Baseline(Colors(BaseLoading));
export const Login = Baseline(Colors(BaseLogin));
export const Memory = Baseline(Colors(BaseMemory));
export const Metadata = Baseline(Colors(BaseMetadata));
export const Minus = Baseline(Colors(BaseMinus));
export const Name = Baseline(Colors(BaseName));
export const Network = Baseline(Colors(BaseNetwork));
export const Package = Baseline(Colors(BasePackage));
export const Plus = Baseline(Colors(BasePlus));
export const Private = Baseline(Colors(BasePrivate));
export const Public = Baseline(Colors(BasePublic));
export const Randomize = Baseline(Colors(BaseRandomize));
export const Reset = Baseline(Colors(BaseReset));
export const Restart = Baseline(Colors(BaseRestart));
export const Script = Baseline(Colors(BaseScript));
export const Services = Baseline(Colors(BaseServices));
export const Start = Baseline(Colors(BaseStart));
export const Stop = Baseline(Colors(BaseStop));
export const Storage = Baseline(Colors(BaseStorage));
export const Tags = Baseline(Colors(BaseTags));
export const Triton = Baseline(Colors(BaseTriton));
export const User = Baseline(Colors(BaseUser));
