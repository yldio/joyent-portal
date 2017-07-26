import React from 'react';
import styled from 'styled-components';
import { Strong } from 'normalized-styled-components';
import { Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import tinycolor from 'tinycolor2';
import { bottomShaddow } from '../boxes';
import P from '../text/p';
import theme from './';

const Box = styled.div`
  margin-bottom: ${remcalc(10)};
  box-shadow: ${bottomShaddow};
  border: solid ${remcalc(1)} ${props => props.border};
`;

const InnerBox = styled.div`
  padding: ${remcalc(18)};
  margin-top: ${remcalc(-7)};
  background: ${props => props.background};
  color: ${props => props.text};
`;
// Border: solid ${remcalc(1)} ${props => props.border};
// border-top-width: 0;

const Preview = styled.div`
  display: inline-block;
  background: ${props => props.hex};
  height: ${remcalc(100)};
  width: 100%;
`;

const Paragraph = P.extend`
  margin: 0;
`;

const baseColorNames = Object.keys(theme).filter(
  name => typeof theme[name] === 'string'
);

const mostReadable = hex =>
  tinycolor
    .mostReadable(hex, baseColorNames.map(name => theme[name]))
    .toHexString();

const borderColor = hex =>
  tinycolor
    .mostReadable(hex, [
      theme.text,
      theme.topologyBackground,
      theme.secondaryActive,
      theme.secondaryHover,
      theme.secondary
    ])
    .toHexString();

const Color = ({ name, hex }) =>
  <Box border={borderColor(hex)}>
    <Preview hex={hex} />
    <InnerBox background={hex} text={mostReadable(hex)}>
      <Paragraph>
        <Strong>Name</Strong>: <br />
        {titleCase(name)}
      </Paragraph>
      <br />
      <Paragraph>
        <Strong>Property</Strong>: <br />
        <code>{name}</code>
      </Paragraph>
      <br />
      <Paragraph>
        <Strong>Hex</Strong>: <br />
        <code>{hex.toUpperCase()}</code>
      </Paragraph>
    </InnerBox>
  </Box>;

export default () => {
  const colors = Object.keys(theme)
    .filter(name => typeof theme[name] === 'string')
    .sort((a, b) => {
      const _a = tinycolor(theme[a]).toHsl().h;
      const _b = tinycolor(theme[b]).toHsl().h;

      return _a >= _b ? -1 : 1;
    })
    .map(name =>
      <Col key={name} xs={4}>
        <Color name={name} hex={theme[name]} />
      </Col>
    );

  return (
    <Row>
      {colors}
    </Row>
  );
};
