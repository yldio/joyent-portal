import unitcalc from 'unitcalc';
import styled from 'styled-components';
import camelCase from 'camel-case';

const sides = ['top', 'right', 'bottom', 'left'];

const unitProps = (() => {
  const sided = rule => sides.map(side => `${rule}-${side}`);

  const measures = ['margin', 'padding'].reduce(
    (props, rule) => [...props, rule, ...sided(rule)],
    []
  );

  return sides.reduce((acc, side) => [...acc, `border-${side}-width`], [
    'border',
    ...measures
  ]);
})();

const unitsFromProps = props =>
  unitProps
    .filter(measure => props[camelCase(measure)])
    .map(
      measure => `
    ${measure}: ${unitcalc(props[camelCase(measure)])};
  `
    )
    .join(';\n');

export default Component =>
  Component.extend
    ? Component.extend`
        ${unitsFromProps};
      `
    : styled(Component)`${unitsFromProps}`;
