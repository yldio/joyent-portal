import styled from 'styled-components';
import { H1 as NH1 } from 'normalized-styled-components';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';

export const H1 = styled(NH1)`
  font-family: ${props => props.theme.font.families};
  color: ${props => props.theme.text};

  font-size: ${remcalc(36)};
  line-height: ${remcalc(45)};
  font-style: normal;
  font-stretch: normal;
  font-weight: normal;

  ${is('inline')`
    display: inline-block;
  `};

  ${is('small')`
    font-size: ${remcalc(32)};
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;

export const H2 = styled.h2`
  color: ${props => props.theme.text};
  font-weight: normal;
  line-height: ${remcalc(30)};
  font-size: ${remcalc(24)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('small')`
    font-size: ${remcalc(24)};
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;

export const H3 = styled.h3`
  color: ${props => props.theme.text};
  font-weight: normal;
  line-height: ${remcalc(26)};
  font-size: ${remcalc(21)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('small')`
    font-size: ${remcalc(18)};
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;

export const H4 = styled.h4`
  color: ${props => props.theme.text};
  font-weight: ${props => props.theme.font.weight.semibold};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;

export const H5 = styled.h4`
  color: ${props => props.theme.text};
  font-weight: normal;
  line-height: ${remcalc(24)};
  font-size: ${remcalc(15)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;

export const H6 = styled.h6`
  color: ${props => props.theme.text};
  font-weight: normal;
  line-height: ${remcalc(18)};
  font-size: ${remcalc(13)};

  ${is('inline')`
    display: inline-block;
  `};

  ${is('bold')`
    font-weight: ${props => props.theme.font.weight.semibold};
  `};

  ${is('white')`
    -webkit-text-fill-color: currentcolor;
    color: ${props => props.theme.white}
  `};
`;
