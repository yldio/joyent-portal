/*
 * based on
 * github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Grid.js
 */

const composers = require('../../shared/composers');
const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  breakpoints,
  sizes
} = constants;

const {
  Baseline
} = composers;

const {
  default: styled,
  css
} = Styled;

const fluid = (props) => props.fluid && css`
  padding-left: ${sizes.outerMargin};
  padding-right: ${sizes.outerMargin};
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;

  ${fluid}

  ${breakpoints.small`
    max-width: ${sizes.containerSm || '46rem'};
  `}

  ${breakpoints.medium`
    max-width: ${sizes.containerMd || '61rem'};
  `}

  ${breakpoints.large`
    max-width: ${sizes.containerLg || '71rem'};
  `}
`;

module.exports = Baseline(
  Container
);
