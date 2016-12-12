const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const {
  FormattedMessage
} = ReactIntl;

const {
  default: styled
} = Styled;

const StyledWrapper = styled.div`
  background-color: red;
`;

const Home = () => {
  return (
    <StyledWrapper>
      <h1>
        <FormattedMessage id='greetings' />
      </h1>
    </StyledWrapper>
  );
};

module.exports = Home;
