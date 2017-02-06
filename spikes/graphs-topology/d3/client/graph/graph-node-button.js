const React = require('React');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const StyledButton = styled.rect`
  opacity: 0;
  cursor: pointer;
`;

const StyledButtonCircle = styled.circle`
  fill: white;
`;

class GraphNodeButton extends React.Component {

  render() {
    const {
      buttonRect,
      onButtonClick
    } = this.props;

    const buttonCircleRadius = 2;
    const buttonCircleSpacing = 2;
    const buttonCircleY = (buttonRect.height - buttonCircleRadius*4 - buttonCircleSpacing*2)/2;
    const buttonCircles = [1,2,3].map((item, index) => (
      <StyledButtonCircle
        key={index}
        cx={buttonRect.width/2}
        cy={buttonCircleY + (buttonCircleRadius*2 + buttonCircleSpacing)*index}
        r={2}
      />
    ));

    return (
      <g transform={`translate(${buttonRect.x}, ${buttonRect.y})`}>
        <StyledButton onClick={onButtonClick} width={buttonRect.width} height={buttonRect.height}/>
        {buttonCircles}
      </g>
    );
  }
}

GraphNodeButton.propTypes = {
  buttonRect: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  }).isRequired,
  onButtonClick: React.PropTypes.func.isRequired
}

module.exports = GraphNodeButton;
