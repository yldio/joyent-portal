const React = require('react');
const Styled = require('styled-components');

const constants = require('../../shared/constants');
const Column = require('../column');
const Row = require('../row');

const {
  default: styled
} = Styled;

const {
  storiesOf
} = require('@kadira/storybook');

const {
  colors
} = constants;

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

storiesOf('Colors', module)
  .add('default', () => {
    const renderColors = Object.keys(colors.base).map( (color, index) => {

      const StyledSquare = styled(Square)`
        background: ${colors.base[color]}
      `;

      return (
        <Column xs={2} key={index}>
          <StyledWrapper>
            <StyledSquare />
            <p>Alias: {color}</p>
            <p>Hex: {colors.base[color]}</p>
          </StyledWrapper>
        </Column>
      );
    });

    return (
      <Row>
        {renderColors}
      </Row>
    );
  });