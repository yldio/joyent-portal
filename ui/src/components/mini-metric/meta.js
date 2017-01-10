const constants = require('../../shared/constants');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  default: styled
} = Styled;

const OuterBox = styled.div`
  height: 38px;
  padding: 8px 12px;
  border-bottom: 1px solid ${colors.seperator};
`;

const InnerBox = styled.div`
  width: 136px;
  height: 36px;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  text-align: right;
  color: ${colors.regular};
`;

const Meta = (props) => (
  <OuterBox {...props}>
    <InnerBox>
      {props.children}
    </InnerBox>
  </OuterBox>
);

Meta.propTypes = {
  children: React.PropTypes.node
};

module.exports = Meta;
