import styled from 'styled-components';
import camelCase from 'camel-case';

const aligns = ['vertical-align'];

const alignsFromProps = props =>
  aligns
    .filter(align => props[camelCase(align)])
    .map(
      align => `
    ${align}: ${props[camelCase(align)]};
  `
    )
    .join(';\n');

export default Component =>
  Component.extend
    ? Component.extend`
        ${alignsFromProps};
      `
    : styled(Component)`
        ${alignsFromProps};
      `;
