import React from 'react';
import { withTheme } from 'styled-components';

import {
  Actions as BaseActions,
  Affinity as BaseAffinity,
  Arrow as BaseArrow,
  Bin as BaseBin,
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
  Id as BaseId,
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
  Tick as BaseTick,
  User as BaseUser
} from 'joyent-icons';

const Colors = Component =>
  withTheme(({ theme = {}, ...rest }) => (
    <Component {...rest} colors={theme} />
  ));

export const Actions = Colors(BaseActions);
export const Affinity = Colors(BaseAffinity);
export const Arrow = Colors(BaseArrow);
export const Bin = Colors(BaseBin);
export const Clipboard = Colors(BaseClipboard);
export const Close = Colors(BaseClose);
export const Cns = Colors(BaseCns);
export const Copy = Colors(BaseCopy);
export const Cpu = Colors(BaseCpu);
export const DataCenter = Colors(BaseDataCenter);
export const Delete = Colors(BaseDelete);
export const Dot = Colors(BaseDot);
export const Duplicate = Colors(BaseDuplicate);
export const Edit = Colors(BaseEdit);
export const Fabric = Colors(BaseFabric);
export const Firewall = Colors(BaseFirewall);
export const General = Colors(BaseGeneral);
export const Id = Colors(BaseId);
export const InstanceCount = Colors(BaseInstanceCount);
export const InstanceType = Colors(BaseInstanceType);
export const Instances = Colors(BaseInstances);
export const Loading = Colors(BaseLoading);
export const Login = Colors(BaseLogin);
export const Memory = Colors(BaseMemory);
export const Metadata = Colors(BaseMetadata);
export const Minus = Colors(BaseMinus);
export const Name = Colors(BaseName);
export const Network = Colors(BaseNetwork);
export const Package = Colors(BasePackage);
export const Plus = Colors(BasePlus);
export const Private = Colors(BasePrivate);
export const Public = Colors(BasePublic);
export const Randomize = Colors(BaseRandomize);
export const Reset = Colors(BaseReset);
export const Restart = Colors(BaseRestart);
export const Script = Colors(BaseScript);
export const Services = Colors(BaseServices);
export const Start = Colors(BaseStart);
export const Stop = Colors(BaseStop);
export const Storage = Colors(BaseStorage);
export const Tags = Colors(BaseTags);
export const Tick = Colors(BaseTick);
export const Triton = Colors(BaseTriton);
export const User = Colors(BaseUser);
