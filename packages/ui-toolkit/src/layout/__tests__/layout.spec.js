import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import remcalc from 'remcalc';

import { PageContainer, ViewContainer } from '../';
import { Theme } from '../../mocks';

describe('Layout', () => {
  test('PageContainer', () => {
    const tree = renderer
      .create(
        <Theme>
          <PageContainer />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-flow', 'column');
    expect(tree).toHaveStyleRule('flex', '1 1 auto');
  });

  test('ViewContainer', () => {
    const tree = renderer
      .create(
        <Theme>
          <ViewContainer />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('max-width', remcalc(1260));
  });

  test('ViewContainer fluid', () => {
    const tree = renderer
      .create(
        <Theme>
          <ViewContainer fluid />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('padding-left', '0');
    expect(tree).toHaveStyleRule('padding-right', '0');
  });

  test('ViewContainer main', () => {
    const tree = renderer
      .create(
        <Theme>
          <ViewContainer main />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('padding-bottom', remcalc(18));
  });

  test('ViewContainer center', () => {
    const tree = renderer
      .create(
        <Theme>
          <ViewContainer center />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-direction', 'column');
    expect(tree).toHaveStyleRule('justify-content', 'center');
    expect(tree).toHaveStyleRule('align-content', 'center');
    expect(tree).toHaveStyleRule('align-items', 'center');
  });
});
