import styled from 'styled-components';
import { Fieldset } from 'normalized-styled-components';
import Baseline from '../baseline';

const StyledFieldset = Fieldset.extend`
  display: inline-block;
  margin: 0;
  padding: 0;
  border: none;
  overflow: hidden;
  width: 100%;
  height: auto;

  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-before: 0;
  -webkit-padding-start: 0;
  -webkit-padding-end: 0;
  -webkit-padding-after: 0;
`;

export default Baseline(StyledFieldset);
