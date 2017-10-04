import React from 'react';
import styled from 'styled-components';
import { Strong } from 'normalized-styled-components';
import { Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import tinycolor from 'tinycolor2';
import P from '../text/p';
import theme, { base } from './';

const Box = styled.div`
  width: ${remcalc(130)};
  margin-bottom: ${remcalc(46)};
`;

const InnerBox = styled.div`
  margin-top: ${remcalc(6)};
  line-height: 24px;
  font-size: 16px;
  color: ${theme.text};
`;
// Border: solid ${remcalc(1)} ${props => props.border};
// border-top-width: 0;

const Preview = styled.div`
  display: inline-block;
  background: ${props => props.hex};
  width: ${remcalc(96)};
  height: ${remcalc(96)};
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.05);
`;

const Paragraph = P.extend`
  /* trick prettier */
  margin: 0;
`;

const Color = ({ name, hex }) => (
  <Box>
    <Preview hex={hex} />
    <InnerBox background={hex}>
      <Paragraph>
        <Strong>{titleCase(name)}</Strong>
      </Paragraph>
      <Paragraph>{hex.toUpperCase()}</Paragraph>
    </InnerBox>
  </Box>
);

export default () => {
  const colors = Object.keys(base)
    .filter(name => typeof theme[name] === 'string')
    .sort((a, b) => {
      const _a = tinycolor(theme[a]).toHsl().h;
      const _b = tinycolor(theme[b]).toHsl().h;

      return _a >= _b ? -1 : 1;
    })
    .map(name => <Color key={name} name={name} hex={theme[name]} />);

  return <Row>{colors}</Row>;
};
