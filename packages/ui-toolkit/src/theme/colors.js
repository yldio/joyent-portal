import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { P, H3 } from '../text';
import is from 'styled-is';
import theme from './';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import copy from 'clipboard-copy';
import { Clipboard } from '../icons';


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

const parseRGB = c => {
  const color = c.split('(');
  const rgb = color[1].split(')')[0];


  return `${color[0].toUpperCase()}: ${rgb}`
}

const Box = styled.div`
  width: ${remcalc(187)};
  height: ${remcalc(126)};
  background: ${props => props.hex};
  padding: ${remcalc(18)} ${remcalc(26)};
  box-sizing: border-box;

  ${is('bottom') `
    margin-bottom: ${remcalc(45)};
  `};

  ${is('right') `
    margin-right: ${remcalc(45)};
  `}
`;

const ClipboardIconActionable = Clipboard.extend`
  cursor: pointer;
  margin-left: ${remcalc(12)};

  path { fill: ${props => props.theme.white}; }

  ${is('dark') `
    path { fill: ${props => props.theme.text}; }
  `};
`;

const Paragraph = P.extend`
  font-size: ${remcalc(13)};
  margin: 0;
  font-weight: bold;
  color: ${props => props.theme.white};
  -webkit-text-fill-color: currentcolor;
  width: ${remcalc(193)};
  text-align: left;

  ${is('dark') `
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
  `};
`;

const Code = styled.code`
  font-size: ${remcalc(13)};
  margin: 0;
  color: ${props => props.theme.white};

  ${is('dark') `
    color: ${props => props.theme.text};
    -webkit-text-fill-color: currentcolor;
  `};
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  height: ${remcalc(48)};

  li {
    padding: 0;

    &:not(:last-child) {
      margin-bottom: ${remcalc(6)};
    }
  }
`;

const Color = ({ name, color, dark, bottom, right }) => (
  <Box hex={color} bottom={bottom} right={right}>
    <List>
      <li>
        <Paragraph dark={dark}>{name}</Paragraph>
      </li>
      <li>
        <Flex alignCenter><Code dark={dark}>{rgb2hex(color).toUpperCase()}</Code>  <ClipboardIconActionable dark={dark} onClick={() => copy(rgb2hex(color).toUpperCase())} /></Flex>
      </li>
      <li>
        <Code dark={dark}>{parseRGB(color)}</Code>
      </li>
    </List>
  </Box>
);

export default () => (
  <Fragment>
    <div>
      <H3>Action Colors</H3>
      <P>
        This palette contains Triton’s ‘action and status’ colors. They aim to
        communicate that a component is interactable and has a purpose. They also
        act as status colors to alert users on the condition and nature of
        components.
    </P>
    </div>
    <Margin style={{ display: 'inline-block' }} top={4} bottom={5} right={5}>
      <Color
        key="primaryHover"
        name="Blue 1"
        color={theme.primary}
      />
      <Color
        key="primaryActive"
        name="Blue 2"
        color={theme.primaryActive}
      />
    </Margin>
    <Margin style={{ display: 'inline-block' }} top={4} bottom={5}>
      <Color
        key="joyent1"
        name="Joyent 1"
        color="rgb(44, 72, 89)"
      />
      <Color
        key="joyent2"
        name="Joyent 2"
        color="rgb(27, 50, 64)"
      />
    </Margin>
    <div>
      <Margin right={5} style={{ display: 'inline-block' }} bottom={2}>
        <Color key="green" name="Green 1" color={theme.green} />
        <Color
          key="greenDark"
          name="Green 2"
          color={theme.greenDark}
        />
      </Margin>
      <Margin bottom={2} right={5} style={{ display: 'inline-block' }}>
        <Color key="orange" name="Orange 1" color={theme.orange} />
        <Color
          key="orangeDark"
          name="Orange 2"
          color={theme.orangeDark}
        />
      </Margin>
      <Margin bottom={5} right={5} style={{ display: 'inline-block' }}>
        <Color key="red" name="Red 1" color={theme.red} />
        <Color key="redDark" name="Red 2" color={theme.redDark} />
      </Margin>
    </div>
    <H3>Greys</H3>
    <P>
      Greys give Triton a sense of depth and offer contrast between potentially
      similar components. They allow us to make certain components look clickable,
      whilst making others appear disabled or static.
  </P>
    <Margin top={4}>
      <Flex wrap>
        <Color
          bottom
          right
          dark
          key="disabled"
          name="Grey 1 - Background"
          color={theme.disabled}
        />
        <Color
          bottom
          right
          dark
          key="whiteActive"
          name="Grey 2 - Faded"
          color={theme.whiteActive}
        />
        <Color bottom dark key="grey" name="Grey 3  - Dividers" color={theme.grey} />
        <Color bottom right key="greyDark" name="Grey 4  - Disabled" color={theme.greyDark} />
        <Color bottom right key="text" name="Grey 5  - Text" color={theme.text} />
        <Color bottom
          key="greyDarker"
          name="Grey 6"
          color={theme.greyDarker}
        />
      </Flex>
    </Margin>
  </Fragment>
)
