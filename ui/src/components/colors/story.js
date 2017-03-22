import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../shared/constants';
import Column from '../column';
import Row from '../row';

const StyledWrapper = styled.div`
  margin-left: ${remcalc(20)};
  margin-bottom: ${remcalc(20)};
  border: solid ${remcalc(1)} ${colors.base.grey};
  padding: ${remcalc(18)};

`;

const Square = styled.div`
  display: inline-block;
  border: solid ${remcalc(1)} ${colors.base.grey};
  width: 100%;
  height: ${remcalc(100)};
`;

const StyledP = styled.p`
  margin: 0;
`;

const convertCase = (val) => {
  const result = val.replace( /([A-Z])/g, ' $1' );
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const squares = Object.keys(colors.base).reduce((squares, color) => ({
  ...squares,
  [color]: styled(Square)`
    background: ${colors.base[color]}
  `
}), {});

const ColoredSquare = ({
  // eslint-disable-next-line react/prop-types
  color
}) => React.createElement(squares[color]);

storiesOf('Colors', module)
  .add('default', () => {
    const _colors = Object.keys(colors.base)
      .sort()
      .map((color, index) => (
        <Column
          key={index}
          md={3}
          xs={6}
        >
          <StyledWrapper>
            <ColoredSquare color={color} />
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
      ));

    return (
      <Row>
        {_colors}
      </Row>
    );
  });
