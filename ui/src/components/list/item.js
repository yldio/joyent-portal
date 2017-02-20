import styled from 'styled-components';
import transferProps from '../../shared/transfer-props';
import { Baseline } from '../../shared/composers';
import { boxes, colors } from '../../shared/constants';
import { remcalc, is } from '../../shared/functions';
import Row from '../row';
import React from 'react';

const paper = `
  0 ${remcalc(8)} 0 ${remcalc(-5)} ${colors.base.grey},
  0 ${remcalc(8)} ${remcalc(1)} ${remcalc(-4)} ${colors.base.grey},
  0 ${remcalc(16)} 0 ${remcalc(-10)} ${colors.base.grey},
  0 ${remcalc(16)} ${remcalc(1)} ${remcalc(-9)} ${colors.base.grey};
`;

const Item = styled(Row)`
  position: relative;
  height: auto;
  min-height: ${remcalc(126)};
  margin-bottom: ${remcalc(10)};
  border: ${remcalc(1)} solid ${colors.base.grey};
  background-color: ${colors.base.white};
  box-shadow: ${boxes.bottomShaddow};

  ${is('collapsed')`
    height: ${remcalc(48)};
    min-height: auto;

    ${is('headed')`
      box-shadow: ${boxes.bottomShaddowDarker};
    `};
  `};

  ${is('stacked')`
    box-shadow: ${paper};
    margin-bottom: ${remcalc(16)};
  `};

  ${is('flat')`
    box-shadow: none;
  `};
`;

export default Baseline(
  transferProps([
    'collapsed',
    'headed'
  ], ({
    children,
    ...props
  }) => (
    <Item name='list-item' {...props}>
      {children}
    </Item>
  ))
);

