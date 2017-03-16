import styled from 'styled-components';
import { remcalc } from '../../../shared/functions';
import { colors } from '../../../shared/constants';
import { Baseline } from '../../../shared/composers';
import Button from '../../button';

const MetricButtonIcon = styled(Button)`
  position: relative;
  display: flex;
  margin: 0;
  padding: ${remcalc(18)} ${remcalc(24)};
  float: right;
  background-color: ${colors.base.primaryDesaturated};
  line-height: 1.5;
  border: none;
  border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturated};
  cursor: pointer;
  top: auto;
  right: auto;
  margin-left: 0 !important;
  min-width: auto;

  &:hover,
  &:focus,
  &:active,
  &:active:hover,
  &:active:focus {
    background-color: ${colors.base.primaryHover};
    border: none;
    border-left: solid ${remcalc(1)} ${colors.base.primaryDesaturatedHover};
  }
`;

export default Baseline(
  MetricButtonIcon
);
