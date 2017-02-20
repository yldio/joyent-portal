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
  margin-left: 20px;
  margin-bottom: 20px;
  border: solid 1px ${colors.base.grey};
  padding: 18px;
  
`;

const Square = styled.div`
  display: inline-block;
  border: solid 1px ${colors.base.grey};
  width: 100%;
  height: 100px
`;

const StyledP = styled.p`
  margin: 0;
`;

const convertCase = (val) => {
  const result = val.replace( /([A-Z])/g, ' $1' );
  return result.charAt(0).toUpperCase() + result.slice(1);
};

storiesOf('Colors', module)
  .add('default', () => {
    const renderColors = Object.keys(colors.base)
        .sort()
        .map( (color, index) => {

          const StyledSquare = styled(Square)`
            background: ${colors.base[color]}
          `;

          return (
            <Column
              key={index}
              md={3}
              xs={6}
            >
              <StyledWrapper>
                <StyledSquare />
                <StyledP>
                  <strong>Name</strong>:
                  <br />{convertCase(color)}
                </StyledP>

                <StyledP>
                  <strong>Const</strong>:
                  <br />{color}
                </StyledP>

                <StyledP>
                  <strong>Hex</strong>: {colors.base[color].toUpperCase()}
                </StyledP>
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