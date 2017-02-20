const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const Row = require('@ui/components/row');
const BaseElements = require('@ui/components/base-elements');

const fns = require('@ui/shared/functions');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  P,
  H2,
  H3
} = BaseElements;

const {
  FormattedMessage
} = ReactIntl;

const StyledBox = styled.div`
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid 1px #d8d8d8;
  padding: ${remcalc('6 18 24')};
  
  & + & {
    margin-top: ${remcalc(24)};
  }
`;

module.exports = () => (
  <div>
    <Row name='empty-services'>
      <Column>
        <H2>
          <FormattedMessage id='services' />
        </H2>

        <Row>
          <Column>
            <StyledBox>
              <Row>
                <Column md={10}>
                  <H3>
                    <FormattedMessage id='import-services-title' />
                  </H3>
                  <P>
                    <FormattedMessage id='import-services-body' />
                  </P>

                  <Button secondary>from GitHub</Button>
                  <Button secondary>from GitLab</Button>
                  <Button secondary>from BitBucket</Button>
                </Column>
              </Row>
            </StyledBox>

            <StyledBox>
              <Row>
                <Column md={9}>
                  <H3>
                    <FormattedMessage id='alt-import-services-title' />
                  </H3>
                  <P>
                    <FormattedMessage id='alt-import-services-body' />
                  </P>

                  <Button secondary>Upload manifest</Button>
                  <Button secondary>Edit manifest</Button>
                </Column>
              </Row>
            </StyledBox>
          </Column>
        </Row>
      </Column>
    </Row>
  </div>
);
