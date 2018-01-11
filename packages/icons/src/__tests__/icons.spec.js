import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { colors } from '../colors';

import {
  Actions,
  Affinity,
  Arrow,
  Bin,
  Checkcircle,
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
  Health,
  Id,
  Import,
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

it('renders <Actions /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Actions />
            <Actions light />
            <Actions disabled />
            <Actions direction="right" />
            <Actions direction="up" />
            <Actions direction="left" />
            <Actions direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Affinity /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Affinity />
            <Affinity light />
            <Affinity disabled />
            <Affinity direction="right" />
            <Affinity direction="up" />
            <Affinity direction="left" />
            <Affinity direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Arrow /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Arrow />
            <Arrow light />
            <Arrow disabled />
            <Arrow direction="right" />
            <Arrow direction="up" />
            <Arrow direction="left" />
            <Arrow direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Bin /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Bin />
            <Bin light />
            <Bin disabled />
            <Bin direction="right" />
            <Bin direction="up" />
            <Bin direction="left" />
            <Bin direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Checkcircle /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Checkcircle />
            <Checkcircle light />
            <Checkcircle disabled />
            <Checkcircle direction="right" />
            <Checkcircle direction="up" />
            <Checkcircle direction="left" />
            <Checkcircle direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Clipboard /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Clipboard />
            <Clipboard light />
            <Clipboard disabled />
            <Clipboard direction="right" />
            <Clipboard direction="up" />
            <Clipboard direction="left" />
            <Clipboard direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Close /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Close />
            <Close light />
            <Close disabled />
            <Close direction="right" />
            <Close direction="up" />
            <Close direction="left" />
            <Close direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Cns />
            <Cns light />
            <Cns disabled />
            <Cns direction="right" />
            <Cns direction="up" />
            <Cns direction="left" />
            <Cns direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Copy /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Copy />
            <Copy light />
            <Copy disabled />
            <Copy direction="right" />
            <Copy direction="up" />
            <Copy direction="left" />
            <Copy direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cpu /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Cpu />
            <Cpu light />
            <Cpu disabled />
            <Cpu direction="right" />
            <Cpu direction="up" />
            <Cpu direction="left" />
            <Cpu direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <DataCenter /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <DataCenter />
            <DataCenter light />
            <DataCenter disabled />
            <DataCenter direction="right" />
            <DataCenter direction="up" />
            <DataCenter direction="left" />
            <DataCenter direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Delete /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Delete />
            <Delete light />
            <Delete disabled />
            <Delete direction="right" />
            <Delete direction="up" />
            <Delete direction="left" />
            <Delete direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Dot /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Dot />
            <Dot light />
            <Dot disabled />
            <Dot direction="right" />
            <Dot direction="up" />
            <Dot direction="left" />
            <Dot direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Duplicate /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Duplicate />
            <Duplicate light />
            <Duplicate disabled />
            <Duplicate direction="right" />
            <Duplicate direction="up" />
            <Duplicate direction="left" />
            <Duplicate direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Edit /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Edit />
            <Edit light />
            <Edit disabled />
            <Edit direction="right" />
            <Edit direction="up" />
            <Edit direction="left" />
            <Edit direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Fabric /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Fabric />
            <Fabric light />
            <Fabric disabled />
            <Fabric direction="right" />
            <Fabric direction="up" />
            <Fabric direction="left" />
            <Fabric direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Firewall /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Firewall />
            <Firewall light />
            <Firewall disabled />
            <Firewall direction="right" />
            <Firewall direction="up" />
            <Firewall direction="left" />
            <Firewall direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <General /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <General />
            <General light />
            <General disabled />
            <General direction="right" />
            <General direction="up" />
            <General direction="left" />
            <General direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Health /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Health />
            <Health light />
            <Health disabled />
            <Health direction="right" />
            <Health direction="up" />
            <Health direction="left" />
            <Health direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Id /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Id />
            <Id light />
            <Id disabled />
            <Id direction="right" />
            <Id direction="up" />
            <Id direction="left" />
            <Id direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Import /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Import />
            <Import light />
            <Import disabled />
            <Import direction="right" />
            <Import direction="up" />
            <Import direction="left" />
            <Import direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceCount /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <InstanceCount />
            <InstanceCount light />
            <InstanceCount disabled />
            <InstanceCount direction="right" />
            <InstanceCount direction="up" />
            <InstanceCount direction="left" />
            <InstanceCount direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <InstanceType /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <InstanceType />
            <InstanceType light />
            <InstanceType disabled />
            <InstanceType direction="right" />
            <InstanceType direction="up" />
            <InstanceType direction="left" />
            <InstanceType direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Instances /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Instances />
            <Instances light />
            <Instances disabled />
            <Instances direction="right" />
            <Instances direction="up" />
            <Instances direction="left" />
            <Instances direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Loading />
            <Loading light />
            <Loading disabled />
            <Loading direction="right" />
            <Loading direction="up" />
            <Loading direction="left" />
            <Loading direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Login /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Login />
            <Login light />
            <Login disabled />
            <Login direction="right" />
            <Login direction="up" />
            <Login direction="left" />
            <Login direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Memory /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Memory />
            <Memory light />
            <Memory disabled />
            <Memory direction="right" />
            <Memory direction="up" />
            <Memory direction="left" />
            <Memory direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Metadata /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Metadata />
            <Metadata light />
            <Metadata disabled />
            <Metadata direction="right" />
            <Metadata direction="up" />
            <Metadata direction="left" />
            <Metadata direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Minus /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Minus />
            <Minus light />
            <Minus disabled />
            <Minus direction="right" />
            <Minus direction="up" />
            <Minus direction="left" />
            <Minus direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Name /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <name />
            <name light />
            <name disabled />
            <name direction="right" />
            <name direction="up" />
            <name direction="left" />
            <name direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Network /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Network />
            <Network light />
            <Network disabled />
            <Network direction="right" />
            <Network direction="up" />
            <Network direction="left" />
            <Network direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Package /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Package />
            <Package light />
            <Package disabled />
            <Package direction="right" />
            <Package direction="up" />
            <Package direction="left" />
            <Package direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Plus /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Plus />
            <Plus light />
            <Plus disabled />
            <Plus direction="right" />
            <Plus direction="up" />
            <Plus direction="left" />
            <Plus direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Private /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Private />
            <Private light />
            <Private disabled />
            <Private direction="right" />
            <Private direction="up" />
            <Private direction="left" />
            <Private direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Public /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Public />
            <Public light />
            <Public disabled />
            <Public direction="right" />
            <Public direction="up" />
            <Public direction="left" />
            <Public direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Randomize /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Randomize />
            <Randomize light />
            <Randomize disabled />
            <Randomize direction="right" />
            <Randomize direction="up" />
            <Randomize direction="left" />
            <Randomize direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Reset /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Reset />
            <Reset light />
            <Reset disabled />
            <Reset direction="right" />
            <Reset direction="up" />
            <Reset direction="left" />
            <Reset direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Restart /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Restart />
            <Restart light />
            <Restart disabled />
            <Restart direction="right" />
            <Restart direction="up" />
            <Restart direction="left" />
            <Restart direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Start /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Start />
            <Start light />
            <Start disabled />
            <Start direction="right" />
            <Start direction="up" />
            <Start direction="left" />
            <Start direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Stop /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Stop />
            <Stop light />
            <Stop disabled />
            <Stop direction="right" />
            <Stop direction="up" />
            <Stop direction="left" />
            <Stop direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Storage /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Storage />
            <Storage light />
            <Storage disabled />
            <Storage direction="right" />
            <Storage direction="up" />
            <Storage direction="left" />
            <Storage direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Tags /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <tags />
            <tags light />
            <tags disabled />
            <tags direction="right" />
            <tags direction="up" />
            <tags direction="left" />
            <tags direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Triton /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <Triton />
            <Triton light />
            <Triton disabled />
            <Triton direction="right" />
            <Triton direction="up" />
            <Triton direction="left" />
            <Triton direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <User /> without throwing', () => {
  expect(
    renderer
      .create(
        <ThemeProvider theme={colors}>
          <div>
            <User />
            <User light />
            <User disabled />
            <User direction="right" />
            <User direction="up" />
            <User direction="left" />
            <User direction="down" />
          </div>
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot();
});
