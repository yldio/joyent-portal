const React = require('react');
const Styled = require('styled-components');

const constants = require('../../shared/constants');
const Column = require('../column');
const Row = require('../row');
const BaseElements = require('../base-elements');

const {
  default: styled
} = Styled;

const {
  storiesOf
} = require('@kadira/storybook');

const {
  colors
} = constants;

const {
  H1,
  H2,
  H3,
  P,
} = BaseElements;

const StyledWrapper = styled.div`
  display: inline-block;
  float: left;
  margin-left: 20px;
`;

const Square = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px
`;

storiesOf('Typography', module)
  .add('default', () => {
    return (
      <Row>
        <Column>
          <H2>Special Heading - H1</H2>
          <ul>
            <li>Size - 36px</li>
            <li>Line Height - 42px</li>
            <li>Color- <pre>Some Hex</pre></li>
          </ul>
        </Column>
      </Row>
    );
  });