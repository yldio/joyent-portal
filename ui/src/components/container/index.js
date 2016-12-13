/*
 * based on
 * github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Grid.js
 */

const constants = require('../../shared/constants');
const Styled = require('styled-components');

const {
  breakpoints,
  sizes
} = constants;

const {
  default: styled,
  css
} = Styled;

const fluid = (props) => props.fluid && css`
  padding-left: ${sizes.outerMargin};
  padding-right: ${sizes.outerMargin};
`;

module.exports = styled.div`
  margin-left: auto;
  margin-right: auto;

  ${fluid}

  ${breakpoints.small`
    width: ${sizes.containerSm || '46rem'};
  `}

  ${breakpoints.medium`
    width: ${sizes.containerMd || '61rem'};
  `}

  ${breakpoints.large`
    width: ${sizes.containerLg || '71rem'};
  `}
`;
