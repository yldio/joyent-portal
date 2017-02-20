const React = require('react');
const ReactBroadcast = require('react-broadcast');
const Styled = require('styled-components');
const fns = require('../../shared/functions');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const Label = require('../label');

const {
  Subscriber
} = ReactBroadcast;

const StyledLabel = styled(Label)`
  margin-right: ${remcalc(12)};
`;

module.exports = (props) => {
  const render = (value) => {
    const {
      id = ''
    } = (value || {});

    return (
      <StyledLabel
        {...props}
        htmlFor={id}
      />
    );
  };

  return (
    <Subscriber channel='input-group'>
      {render}
    </Subscriber>
  );
};
