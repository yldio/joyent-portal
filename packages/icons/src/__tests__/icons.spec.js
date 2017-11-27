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
  Close,
  DataCenter,
  Dot,
  Health,
  Import,
  Instances,
  Loading,
  Minus,
  Package,
  Plus,
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
