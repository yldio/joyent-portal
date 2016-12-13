const React = require('react');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const Container = require('@ui/components/container');
const fns = require('@ui/shared/functions');
const logo = require('@resources/logo.png');
const Row = require('@ui/components/row');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const StyledHeader = styled.header`
  height: ${remcalc(78)};
  background-color: #ffffff;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0
`;

const StyledLogo = styled.img`
  padding-top: ${remcalc(21)};
  padding-bottom: ${remcalc(21)};
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container fluid>
        <Row>
          <Column xs={2}>
            <StyledLogo src={logo} />
          </Column>
        </Row>
      </Container>
    </StyledHeader>
  );
};

module.exports = Header;
