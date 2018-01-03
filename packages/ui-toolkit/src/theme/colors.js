import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { P, H3 } from '../text';
import is from 'styled-is';
import theme from './';
import { Margin } from 'styled-components-spacing';

// Function to convert hex format to a rgb color
function rgb2hex(rgb) {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : '';
}

const Box = styled.div`
  height: ${remcalc(48)};
  background: ${props => props.hex};
  width: 100%;
  margin: auto;
  text-align: center;
  padding: 0 ${remcalc(60)};
  box-sizing: border-box;
`;

const Paragraph = P.extend`
  font-size: ${remcalc(13)};
  margin: 0;
  font-weight: bold;
  color: ${props => props.theme.white};
  -webkit-text-fill-color: currentcolor;
  width: ${remcalc(193)};
  text-align: left;

  ${is('dark')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
  `};
`;

const Code = styled.code`
  font-size: ${remcalc(13)};
  margin: 0;
  color: ${props => props.theme.white};

  ${is('dark')`
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
  `};
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  height: ${remcalc(48)};

  li {
    padding: 0;
  }
`;

const Color = ({ name, color, dark }) => (
  <Box hex={color}>
    <List>
      <li>
        <Paragraph dark={dark}>{name}</Paragraph>
      </li>
      <li>
        <Code dark={dark}>{rgb2hex(color)}</Code>
      </li>
      <li>
        <Code dark={dark}>{color}</Code>
      </li>
    </List>
  </Box>
);

export default () => [
  <div>
    <H3>Action Colors</H3>
    <P>
      This palette contains Triton’s ‘action and status’ colors. They aim to
      communicate that a component is interactable and has a purpose. They also
      act as status colors to alert users on the condition and nature of
      components.
    </P>
  </div>,
  <Margin top={4} bottom={2}>
    <Color
      key="primaryHover"
      name="Blue 1 - Aqua Marine"
      color={theme.primary}
    />
    <Color
      key="primaryActive"
      name="Blue 2 - Lost in Space"
      color={theme.primaryActive}
    />
  </Margin>,
  <Margin bottom={2}>
    <Color key="green" name="Green 1 - Confirmaton" color={theme.green} />
    <Color
      key="greenDark"
      name="Green 2 - Confirmation Outline"
      color={theme.greenDark}
    />
  </Margin>,
  <Margin bottom={2}>
    <Color key="orange" name="Orange 1 - Warning" color={theme.orange} />
    <Color
      key="orangeDark"
      name="Orange 2 - Warning Outline"
      color={theme.orangeDark}
    />
  </Margin>,
  <Margin bottom={5}>
    <Color key="red" name="Red 1 - Error" color={theme.red} />
    <Color key="redDark" name="Red 2 - Error Outline" color={theme.redDark} />
  </Margin>,
  <H3>Greys</H3>,
  <P>
    Greys give Triton a sense of depth and offer
    contrast between potentially similar components. They allow us to make
    certain components look clickable, whilst making others appear disabled or
    static.
  </P>,
  <Margin top={4}>
    <Color
      dark
      key="disabled"
      name="Grey 1 - Background"
      color={theme.disabled}
    />
    <Color
      dark
      key="whiteActive"
      name="Grey 2 - Faded"
      color={theme.whiteActive}
    />
    <Color dark key="grey" name="Grey 3  - Outline" color={theme.grey} />
    <Color key="greyDark" name="Grey 4  - Disabled" color={theme.greyDark} />
    <Color key="text" name="Grey 5  - Text" color={theme.text} />
    <Color
      key="greyDarker"
      name="Grey 6  - Charcoal"
      color={theme.greyDarker}
    />
  </Margin>
];
