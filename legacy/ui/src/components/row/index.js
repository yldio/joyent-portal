/*
 * based on
 * github.com/roylee0704/react-flexbox-grid/blob/master/src/components/Row.js
 */

import Column from '../column';
import { Baseline } from '../../shared/composers';
import { breakpoints, sizes } from '../../shared/constants';
import match from '../../shared/match';
import sizeMatch from './size-match';
import styled from 'styled-components';
import React from 'react';

const margin = sizes.gutterCompensation || '-0.5rem';

const direction = (size) => match(sizeMatch(size, {
  reverse: 'row-reverse'
}), 'row');

const justify = (size) => match(sizeMatch(size, {
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between'
}), 'flex-start');

const textAlign = (size) => match(sizeMatch(size, {
  center: 'center',
  end: 'end'
}), 'start');

const alignItems = (size) => match(sizeMatch(size, {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end'
}), 'stretch');

// const order = (size) => match(sizeMatch(size, {
//   first: -1,
//   last: 1
// }), 0);

/**
 * ```html
 * <row center top={['xs', 'sm']} first='lg' />
 * ```
 **/
const StyledRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;

  margin-left: ${margin};
  margin-right: ${margin};
  min-width: 100%;

  flex-direction: ${direction('xs')};
  justify-content: ${justify('xs')};
  text-align: ${textAlign('xs')};
  align-items: ${alignItems('xs')};

  ${breakpoints.small`
    flex-direction: ${direction('sm')};
    justify-content: ${justify('sm')};
    text-align: ${textAlign('sm')};
    align-items: ${alignItems('sm')};
  `}

  ${breakpoints.medium`
    flex-direction: ${direction('md')};
    justify-content: ${justify('md')};
    text-align: ${textAlign('md')};
    align-items: ${alignItems('md')};
  `}

  ${breakpoints.large`
    flex-direction: ${direction('lg')};
    justify-content: ${justify('lg')};
    text-align: ${textAlign('lg')};
    align-items: ${alignItems('lg')};
  `}
`;

const Row = ({
  stretch = false,
  children,
  ...rest
}) => {
  return stretch ? (
    <StyledRow {...rest}>
      <Column xs={12}>
        {children}
      </Column>
    </StyledRow>
  ) : (
    <StyledRow {...rest}>
      {children}
    </StyledRow>
  );
};

Row.propTypes = {
  children: React.PropTypes.node,
  stretch: React.PropTypes.bool
};

export default Baseline(
  Row
);
