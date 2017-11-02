import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { P, H2 } from '../text';
import theme from './';

const Box = styled.div`
  width: ${remcalc(130)};
  margin: auto;
  text-align: center;
`;

const Data = styled.td`
  padding: ${remcalc(18)} 0;
  border-bottom: ${remcalc(1)} solid ${theme.grey};
  max-width: ${remcalc(250)};
`;

const Table = styled.table`
  /** */
  width: 100%;
`;

const InnerBox = styled.div`
  margin-top: ${remcalc(6)};
  line-height: ${remcalc(24)};
  font-size: ${remcalc(16)};
  color: ${theme.text};
`;

const Preview = styled.div`
  display: inline-block;
  background: ${props => props.hex};
  width: ${remcalc(96)};
  height: ${remcalc(96)};
  border: ${remcalc(1)} solid ${theme.grey};
  box-shadow: 0 ${remcalc(2)} ${remcalc(1)} rgba(0, 0, 0, 0.05);
`;

const Paragraph = P.extend`
  font-size: ${remcalc(13)};
  margin: 0;
`;

const ColorName = styled(H2)`
  /* trick prettier */
  max-width: ${remcalc(100)};
`;

const Color = ({ name, hex }) => (
  <Box>
    <Preview hex={hex} />
    <InnerBox background={hex}>
      <Paragraph>{hex.toUpperCase()}</Paragraph>
    </InnerBox>
  </Box>
);

export default () => (
  <Table>
    <thead>
      <tr>
        <th />
        <th>Default</th>
        <th>Hover</th>
        <th>Click</th>
        <th>Disabled</th>
        <th>Usage</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <Data>
          <ColorName>Blue fill / blue text</ColorName>
        </Data>
        <Data>
          <Color key="primary" name="primary" hex={theme.primary} />
        </Data>
        <Data>
          <Color
            key="primaryHover"
            name="primaryHover"
            hex={theme.primaryHover}
          />
        </Data>
        <Data>
          <Color
            key="primaryActive"
            name="primaryActive"
            hex={theme.primaryActive}
          />
        </Data>
        <Data>
          <Color key="disabled" name="disabled" hex={theme.disabled} />
        </Data>
        <Data>
          Fill for primary buttons, text anchors (including interactive parts of
          the breadcrumb) and other UI components, whose priority or prominence
          is emphasized with color.
        </Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Blue border</ColorName>
        </Data>
        <Data>
          <Color
            key="primaryActive"
            name="primaryActive"
            hex={theme.primaryActive}
          />
        </Data>
        <Data />
        <Data />
        <Data>
          <Color key="disabled" name="disabled" hex={theme.disabled} />
        </Data>
        <Data>
          Borders of primary buttons and other UI components, whose priority or
          prominence is emphasized with color.
        </Data>
      </tr>
      <tr>
        <Data>
          <ColorName>White fill</ColorName>
        </Data>
        <Data>
          <Color key="white" name="white" hex={theme.white} />
        </Data>
        <Data>
          <Color key="whiteHover" name="whiteHover" hex={theme.whiteHover} />
        </Data>
        <Data>
          <Color key="whiteActive" name="whiteActive" hex={theme.whiteActive} />
        </Data>
        <Data>
          <Color key="disabled" name="disabled" hex={theme.disabled} />
        </Data>
        <Data>
          Fill for secondary buttons, inputs, dropdown menus, tables, service
          and instance cards and other components that need to be distinguished
          from the overall layout.
        </Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Grey border</ColorName>
        </Data>
        <Data>
          <Color key="grey" name="grey" hex={theme.grey} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Borders of white or grey UI components and dividers.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Charcoal fill</ColorName>
        </Data>
        <Data>
          <Color key="secondary" name="secondary" hex={theme.secondary} />
        </Data>
        <Data>
          <Color
            key="secondaryHover"
            name="secondaryHover"
            hex={theme.secondaryHover}
          />
        </Data>
        <Data>
          <Color
            key="secondaryActive"
            name="secondaryActive"
            hex={theme.secondaryActive}
          />
        </Data>
        <Data>
          <Color key="disabled" name="disabled" hex={theme.disabled} />
        </Data>
        <Data>Fill for topology components.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Charcoal border</ColorName>
        </Data>
        <Data>
          <Color
            key="secondaryActive"
            name="secondaryActive"
            hex={theme.secondaryActive}
          />
        </Data>
        <Data />
        <Data />
        <Data>
          <Color
            key="textDisabled"
            name="textDisabled"
            hex={theme.textDisabled}
          />
        </Data>
        <Data>Border for topology components.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Text</ColorName>
        </Data>
        <Data>
          <Color key="text" name="text" hex={theme.text} />
        </Data>
        <Data />
        <Data />
        <Data>
          <Color
            key="textDisabled"
            name="textDisabled"
            hex={theme.textDisabled}
          />
        </Data>
        <Data>Any text.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Example Text</ColorName>
        </Data>
        <Data>
          <Color key="placeholder" name="placeholder" hex={theme.placeholder} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Input placeholder text.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Red fill / red text</ColorName>
        </Data>
        <Data>
          <Color key="red" name="red" hex={theme.red} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Errors</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Red border</ColorName>
        </Data>
        <Data>
          <Color key="redDark" name="redDark" hex={theme.redDark} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Complements red fill.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Green fill / green text</ColorName>
        </Data>
        <Data>
          <Color key="redDark" name="greenDark" hex={theme.greenDark} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Confirmations and instructional components.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Green border</ColorName>
        </Data>
        <Data>
          <Color key="green" name="green" hex={theme.green} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Confirmations and instructional components.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Orange Fill</ColorName>
        </Data>
        <Data>
          <Color key="orange" name="orange" hex={theme.orange} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>To notify users of things that require their attention.</Data>
      </tr>
      <tr>
        <Data>
          <ColorName>Orange border / orange text</ColorName>
        </Data>
        <Data>
          <Color key="orangeDark" name="orangeDark" hex={theme.orangeDark} />
        </Data>
        <Data />
        <Data />
        <Data />
        <Data>Complements orange fill.</Data>
      </tr>
    </tbody>
  </Table>
);
