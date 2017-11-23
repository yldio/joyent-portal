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
  Chevron,
  Clipboard,
  Close,
  Cns,
  DataCenter,
  Delete,
  Dot,
  Duplicate,
  Edit,
  Firewall,
  Health,
  Id,
  Import,
  InstanceCount,
  InstanceType,
  Instances,
  Loading,
  Login,
  Metadata,
  Minus,
  Network,
  Package,
  Plus,
  Reset,
  Start,
  Stop,
  Tags,
  Triton,
  User
} from '..';

it('renders <Actions /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Actions />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Actions light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Actions light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Actions disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Actions disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Actions direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Actions direction="right" />
          <Actions direction="up" />
          <Actions direction="left" />
          <Actions direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Affinity /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Affinity />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Affinity light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Affinity light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Affinity disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Affinity disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Affinity direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Affinity direction="right" />
          <Affinity direction="up" />
          <Affinity direction="left" />
          <Affinity direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Arrow /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Arrow />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Arrow light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Arrow light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Arrow disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Arrow disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Arrow direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Arrow direction="right" />
          <Arrow direction="up" />
          <Arrow direction="left" />
          <Arrow direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Bin /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Bin />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Bin light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Bin light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Bin disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Bin disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Bin direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Bin direction="right" />
          <Bin direction="up" />
          <Bin direction="left" />
          <Bin direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Checkcircle /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Checkcircle />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Checkcircle fill checked /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Checkcircle fill checked />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Checkcircle border checked /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Checkcircle border checked />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Checkcircle border /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Checkcircle border />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Checkcircle checked /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Checkcircle checked />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Chevron /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Chevron />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Chevron light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Chevron light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Chevron disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Chevron disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Chevron direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Chevron direction="right" />
          <Chevron direction="up" />
          <Chevron direction="left" />
          <Chevron direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Clipboard /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Clipboard />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Clipboard light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Clipboard light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Clipboard disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Clipboard disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Clipboard direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Clipboard direction="right" />
          <Clipboard direction="up" />
          <Clipboard direction="left" />
          <Clipboard direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Close /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Close />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Close light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Close light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Close disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Close disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Close direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Close direction="right" />
          <Close direction="up" />
          <Close direction="left" />
          <Close direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Cns /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Cns />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Cns light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Cns light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Cns disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Cns disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Cns direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Cns direction="right" />
          <Cns direction="up" />
          <Cns direction="left" />
          <Cns direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <DataCenter /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <DataCenter />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <DataCenter light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <DataCenter light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <DataCenter disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <DataCenter disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <DataCenter direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <DataCenter direction="right" />
          <DataCenter direction="up" />
          <DataCenter direction="left" />
          <DataCenter direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Delete /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Delete />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Delete light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Delete light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Delete disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Delete disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Delete direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Delete direction="right" />
          <Delete direction="up" />
          <Delete direction="left" />
          <Delete direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Dot red /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Dot red />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Duplicate /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Duplicate />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Duplicate light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Duplicate light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Duplicate disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Duplicate disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Duplicate direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Duplicate direction="right" />
          <Duplicate direction="up" />
          <Duplicate direction="left" />
          <Duplicate direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Edit /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Edit />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Edit light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Edit light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Edit disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Edit disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Edit direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Edit direction="right" />
          <Edit direction="up" />
          <Edit direction="left" />
          <Edit direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Firewall /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Firewall />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Firewall light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Firewall light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Firewall disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Firewall disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Firewall direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Firewall direction="right" />
          <Firewall direction="up" />
          <Firewall direction="left" />
          <Firewall direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Health /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Health />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Health healthy={false} /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Health healthy={false} />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Health direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Health direction="right" />
          <Health direction="up" />
          <Health direction="left" />
          <Health direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Id /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Id />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Id light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Id light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Id disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Id disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Id direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Id direction="right" />
          <Id direction="up" />
          <Id direction="left" />
          <Id direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Import /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Import />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Import direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Import direction="right" />
          <Import direction="up" />
          <Import direction="left" />
          <Import direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceCount /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceCount />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceCount light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceCount light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceCount disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceCount disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceCount direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <InstanceCount direction="right" />
          <InstanceCount direction="up" />
          <InstanceCount direction="left" />
          <InstanceCount direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceType /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceType />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceType light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceType light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceType disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <InstanceType disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <InstanceType direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <InstanceType direction="right" />
          <InstanceType direction="up" />
          <InstanceType direction="left" />
          <InstanceType direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Instances /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Instances />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Instances light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Instances light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Instances disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Instances disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Instances direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Instances direction="right" />
          <Instances direction="up" />
          <Instances direction="left" />
          <Instances direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Loading /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Loading />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Loading secondary /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Loading secondary />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Loading light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Loading light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Loading disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Loading disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Loading direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Loading direction="right" />
          <Loading direction="up" />
          <Loading direction="left" />
          <Loading direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Login /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Login />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Login light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Login light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Login disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Login disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Login direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Login direction="right" />
          <Login direction="up" />
          <Login direction="left" />
          <Login direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Metadata /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Metadata />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Metadata light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Metadata light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Metadata disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Metadata disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Metadata direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Metadata direction="right" />
          <Metadata direction="up" />
          <Metadata direction="left" />
          <Metadata direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Minus /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Minus />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Minus light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Minus light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Minus disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Minus disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Minus direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Minus direction="right" />
          <Minus direction="up" />
          <Minus direction="left" />
          <Minus direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Network /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Network />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Network light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Network light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Network disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Network disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Network direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Network direction="right" />
          <Network direction="up" />
          <Network direction="left" />
          <Network direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Package /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Package />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Package light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Package light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Package disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Package disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Package direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Package direction="right" />
          <Package direction="up" />
          <Package direction="left" />
          <Package direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Plus /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Plus />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Plus light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Plus light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Plus disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Plus disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Plus direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Plus direction="right" />
          <Plus direction="up" />
          <Plus direction="left" />
          <Plus direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Reset /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Reset />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Reset light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Reset light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Reset disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Reset disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Reset direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Reset direction="right" />
          <Reset direction="up" />
          <Reset direction="left" />
          <Reset direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Start /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Start />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Start light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Start light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Start disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Start disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Start direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Start direction="right" />
          <Start direction="up" />
          <Start direction="left" />
          <Start direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Stop /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Stop />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Stop light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Stop light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Stop disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Stop disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Stop direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Stop direction="right" />
          <Stop direction="up" />
          <Stop direction="left" />
          <Stop direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Tags /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Tags />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Tags light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Tags light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Tags disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Tags disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Tags direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Tags direction="right" />
          <Tags direction="up" />
          <Tags direction="left" />
          <Tags direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Triton direction="right" />
          <Triton direction="up" />
          <Triton direction="left" />
          <Triton direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton beta /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton beta />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton light beta /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton light beta />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton disabled beta /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <Triton disabled beta />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Triton direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <Triton direction="right" beta />
          <Triton direction="up" beta />
          <Triton direction="left" beta />
          <Triton direction="down" beta />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <User /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <User />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <User light /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <User light />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <User disabled /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <User disabled />
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <User direction /> without throwing', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={colors}>
        <div>
          <User direction="right" />
          <User direction="up" />
          <User direction="left" />
          <User direction="down" />
        </div>
      </ThemeProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
