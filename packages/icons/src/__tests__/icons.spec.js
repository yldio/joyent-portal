import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import {
  Actions,
  Affinity,
  Arrow,
  Bin,
  Clipboard,
  Close,
  Cns,
  Copy,
  Cpu,
  DataCenter,
  Delete,
  Dot,
  Duplicate,
  Edit,
  Fabric,
  Firewall,
  General,
  Id,
  InstanceCount,
  InstanceType,
  Instances,
  Loading,
  Login,
  Memory,
  Metadata,
  Minus,
  Name,
  Network,
  Package,
  Plus,
  Private,
  Public,
  Randomize,
  Reset,
  Restart,
  Start,
  Stop,
  Storage,
  Tags,
  Triton,
  User
} from '..';

const colors = {
  white: '#FFF',
  text: '#464646',
  greenDark: '#008138',
  green: '#009858',
  orange: '#e38200',
  primary: '#3b46cc'
};

it('renders <Actions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Actions colors={colors} />
          <Actions colors={colors} light />
          <Actions colors={colors} disabled />
          <Actions colors={colors} direction="right" />
          <Actions colors={colors} direction="up" />
          <Actions colors={colors} direction="left" />
          <Actions colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Affinity /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Affinity colors={colors} />
          <Affinity colors={colors} light />
          <Affinity colors={colors} disabled />
          <Affinity colors={colors} direction="right" />
          <Affinity colors={colors} direction="up" />
          <Affinity colors={colors} direction="left" />
          <Affinity colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Arrow /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Arrow colors={colors} />
          <Arrow colors={colors} light />
          <Arrow colors={colors} disabled />
          <Arrow colors={colors} direction="right" />
          <Arrow colors={colors} direction="up" />
          <Arrow colors={colors} direction="left" />
          <Arrow colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Bin /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Bin colors={colors} />
          <Bin colors={colors} light />
          <Bin colors={colors} disabled />
          <Bin colors={colors} direction="right" />
          <Bin colors={colors} direction="up" />
          <Bin colors={colors} direction="left" />
          <Bin colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Clipboard /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Clipboard colors={colors} />
          <Clipboard colors={colors} light />
          <Clipboard colors={colors} disabled />
          <Clipboard colors={colors} direction="right" />
          <Clipboard colors={colors} direction="up" />
          <Clipboard colors={colors} direction="left" />
          <Clipboard colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Close /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Close colors={colors} />
          <Close colors={colors} light />
          <Close colors={colors} disabled />
          <Close colors={colors} direction="right" />
          <Close colors={colors} direction="up" />
          <Close colors={colors} direction="left" />
          <Close colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Cns colors={colors} />
          <Cns colors={colors} light />
          <Cns colors={colors} disabled />
          <Cns colors={colors} direction="right" />
          <Cns colors={colors} direction="up" />
          <Cns colors={colors} direction="left" />
          <Cns colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Copy /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Copy colors={colors} />
          <Copy colors={colors} light />
          <Copy colors={colors} disabled />
          <Copy colors={colors} direction="right" />
          <Copy colors={colors} direction="up" />
          <Copy colors={colors} direction="left" />
          <Copy colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cpu /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Cpu colors={colors} />
          <Cpu colors={colors} light />
          <Cpu colors={colors} disabled />
          <Cpu colors={colors} direction="right" />
          <Cpu colors={colors} direction="up" />
          <Cpu colors={colors} direction="left" />
          <Cpu colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <DataCenter /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <DataCenter colors={colors} />
          <DataCenter colors={colors} light />
          <DataCenter colors={colors} disabled />
          <DataCenter colors={colors} direction="right" />
          <DataCenter colors={colors} direction="up" />
          <DataCenter colors={colors} direction="left" />
          <DataCenter colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Delete /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Delete colors={colors} />
          <Delete colors={colors} light />
          <Delete colors={colors} disabled />
          <Delete colors={colors} direction="right" />
          <Delete colors={colors} direction="up" />
          <Delete colors={colors} direction="left" />
          <Delete colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Dot /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Dot colors={colors} />
          <Dot colors={colors} light />
          <Dot colors={colors} disabled />
          <Dot colors={colors} direction="right" />
          <Dot colors={colors} direction="up" />
          <Dot colors={colors} direction="left" />
          <Dot colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Duplicate /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Duplicate colors={colors} />
          <Duplicate colors={colors} light />
          <Duplicate colors={colors} disabled />
          <Duplicate colors={colors} direction="right" />
          <Duplicate colors={colors} direction="up" />
          <Duplicate colors={colors} direction="left" />
          <Duplicate colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Edit /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Edit colors={colors} />
          <Edit colors={colors} light />
          <Edit colors={colors} disabled />
          <Edit colors={colors} direction="right" />
          <Edit colors={colors} direction="up" />
          <Edit colors={colors} direction="left" />
          <Edit colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Fabric /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Fabric colors={colors} />
          <Fabric colors={colors} light />
          <Fabric colors={colors} disabled />
          <Fabric colors={colors} direction="right" />
          <Fabric colors={colors} direction="up" />
          <Fabric colors={colors} direction="left" />
          <Fabric colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Firewall /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Firewall colors={colors} />
          <Firewall colors={colors} light />
          <Firewall colors={colors} disabled />
          <Firewall colors={colors} direction="right" />
          <Firewall colors={colors} direction="up" />
          <Firewall colors={colors} direction="left" />
          <Firewall colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <General /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <General colors={colors} />
          <General colors={colors} light />
          <General colors={colors} disabled />
          <General colors={colors} direction="right" />
          <General colors={colors} direction="up" />
          <General colors={colors} direction="left" />
          <General colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Id /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Id colors={colors} />
          <Id colors={colors} light />
          <Id colors={colors} disabled />
          <Id colors={colors} direction="right" />
          <Id colors={colors} direction="up" />
          <Id colors={colors} direction="left" />
          <Id colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceCount /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <InstanceCount colors={colors} />
          <InstanceCount colors={colors} light />
          <InstanceCount colors={colors} disabled />
          <InstanceCount colors={colors} direction="right" />
          <InstanceCount colors={colors} direction="up" />
          <InstanceCount colors={colors} direction="left" />
          <InstanceCount colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceType /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <InstanceType colors={colors} />
          <InstanceType colors={colors} light />
          <InstanceType colors={colors} disabled />
          <InstanceType colors={colors} direction="right" />
          <InstanceType colors={colors} direction="up" />
          <InstanceType colors={colors} direction="left" />
          <InstanceType colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Instances /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Instances colors={colors} />
          <Instances colors={colors} light />
          <Instances colors={colors} disabled />
          <Instances colors={colors} direction="right" />
          <Instances colors={colors} direction="up" />
          <Instances colors={colors} direction="left" />
          <Instances colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Loading colors={colors} />
          <Loading colors={colors} light />
          <Loading colors={colors} disabled />
          <Loading colors={colors} direction="right" />
          <Loading colors={colors} direction="up" />
          <Loading colors={colors} direction="left" />
          <Loading colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Login /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Login colors={colors} />
          <Login colors={colors} light />
          <Login colors={colors} disabled />
          <Login colors={colors} direction="right" />
          <Login colors={colors} direction="up" />
          <Login colors={colors} direction="left" />
          <Login colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Memory /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Memory colors={colors} />
          <Memory colors={colors} light />
          <Memory colors={colors} disabled />
          <Memory colors={colors} direction="right" />
          <Memory colors={colors} direction="up" />
          <Memory colors={colors} direction="left" />
          <Memory colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Metadata colors={colors} />
          <Metadata colors={colors} light />
          <Metadata colors={colors} disabled />
          <Metadata colors={colors} direction="right" />
          <Metadata colors={colors} direction="up" />
          <Metadata colors={colors} direction="left" />
          <Metadata colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Minus /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Minus colors={colors} />
          <Minus colors={colors} light />
          <Minus colors={colors} disabled />
          <Minus colors={colors} direction="right" />
          <Minus colors={colors} direction="up" />
          <Minus colors={colors} direction="left" />
          <Minus colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Name /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Name colors={colors} />
          <Name colors={colors} light />
          <Name colors={colors} disabled />
          <Name colors={colors} direction="right" />
          <Name colors={colors} direction="up" />
          <Name colors={colors} direction="left" />
          <Name colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Network colors={colors} />
          <Network colors={colors} light />
          <Network colors={colors} disabled />
          <Network colors={colors} direction="right" />
          <Network colors={colors} direction="up" />
          <Network colors={colors} direction="left" />
          <Network colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Package /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Package colors={colors} />
          <Package colors={colors} light />
          <Package colors={colors} disabled />
          <Package colors={colors} direction="right" />
          <Package colors={colors} direction="up" />
          <Package colors={colors} direction="left" />
          <Package colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Plus /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Plus colors={colors} />
          <Plus colors={colors} light />
          <Plus colors={colors} disabled />
          <Plus colors={colors} direction="right" />
          <Plus colors={colors} direction="up" />
          <Plus colors={colors} direction="left" />
          <Plus colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Private /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Private colors={colors} />
          <Private colors={colors} light />
          <Private colors={colors} disabled />
          <Private colors={colors} direction="right" />
          <Private colors={colors} direction="up" />
          <Private colors={colors} direction="left" />
          <Private colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Public /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Public colors={colors} />
          <Public colors={colors} light />
          <Public colors={colors} disabled />
          <Public colors={colors} direction="right" />
          <Public colors={colors} direction="up" />
          <Public colors={colors} direction="left" />
          <Public colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Randomize /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Randomize colors={colors} />
          <Randomize colors={colors} light />
          <Randomize colors={colors} disabled />
          <Randomize colors={colors} direction="right" />
          <Randomize colors={colors} direction="up" />
          <Randomize colors={colors} direction="left" />
          <Randomize colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Reset /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Reset colors={colors} />
          <Reset colors={colors} light />
          <Reset colors={colors} disabled />
          <Reset colors={colors} direction="right" />
          <Reset colors={colors} direction="up" />
          <Reset colors={colors} direction="left" />
          <Reset colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Restart /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Restart colors={colors} />
          <Restart colors={colors} light />
          <Restart colors={colors} disabled />
          <Restart colors={colors} direction="right" />
          <Restart colors={colors} direction="up" />
          <Restart colors={colors} direction="left" />
          <Restart colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Start /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Start colors={colors} />
          <Start colors={colors} light />
          <Start colors={colors} disabled />
          <Start colors={colors} direction="right" />
          <Start colors={colors} direction="up" />
          <Start colors={colors} direction="left" />
          <Start colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Stop /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Stop colors={colors} />
          <Stop colors={colors} light />
          <Stop colors={colors} disabled />
          <Stop colors={colors} direction="right" />
          <Stop colors={colors} direction="up" />
          <Stop colors={colors} direction="left" />
          <Stop colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Storage /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Storage colors={colors} />
          <Storage colors={colors} light />
          <Storage colors={colors} disabled />
          <Storage colors={colors} direction="right" />
          <Storage colors={colors} direction="up" />
          <Storage colors={colors} direction="left" />
          <Storage colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Tags colors={colors} />
          <Tags colors={colors} light />
          <Tags colors={colors} disabled />
          <Tags colors={colors} direction="right" />
          <Tags colors={colors} direction="up" />
          <Tags colors={colors} direction="left" />
          <Tags colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Triton /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <Triton colors={colors} />
          <Triton colors={colors} light />
          <Triton colors={colors} disabled />
          <Triton colors={colors} direction="right" />
          <Triton colors={colors} direction="up" />
          <Triton colors={colors} direction="left" />
          <Triton colors={colors} direction="down" />
          <Triton colors={colors} beta />
          <Triton colors={colors} beta light />
          <Triton colors={colors} beta disabled />
          <Triton colors={colors} beta direction="right" />
          <Triton colors={colors} beta direction="up" />
          <Triton colors={colors} beta direction="left" />
          <Triton colors={colors} beta direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <User /> without throwing', () => {
  expect(
    renderer
      .create(
        <Fragment>
          <User colors={colors} />
          <User colors={colors} light />
          <User colors={colors} disabled />
          <User colors={colors} direction="right" />
          <User colors={colors} direction="up" />
          <User colors={colors} direction="left" />
          <User colors={colors} direction="down" />
        </Fragment>
      )
      .toJSON()
  ).toMatchSnapshot();
});
