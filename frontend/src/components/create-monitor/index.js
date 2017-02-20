const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const Form = require('@ui/components/form');
const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const fns = require('@ui/shared/functions');
const Row = require('@ui/components/row');


const {
  FormGroup,
  Select,
  Input
} = Form;

const {
  FormattedMessage
} = ReactIntl;

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const H4 = styled.h4`
  margin-bottom: ${remcalc(5)} !important;
`;

const P = styled.p`
  margin-bottom: ${remcalc(20)} !important;
`;

const ConditionsRow = styled(Row)`
  margin-bottom: ${remcalc(33)};
`;

const TextColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.p`
  margin: 0 auto !important;
`;

const RightText = styled(Text)`
  margin: 0 0 0 auto;
`;

const PeopleInput = styled(Input)`
  margin-bottom: ${remcalc(24)};
`;

const CreateMonitor = ({
  handleSubmit,
  pristine,
  submitting
}) => (
  <form onSubmit={handleSubmit}>
    <H4>
      <FormattedMessage id='monitors.conditions' />
    </H4>
    <P>
      <FormattedMessage id='monitors.conditions-subtitle' />
    </P>
    <ConditionsRow around>
      <TextColumn md={2} xs={12}>
        <RightText>
          <FormattedMessage id='monitors.if' />
        </RightText>
      </TextColumn>
      <Column md={2} xs={12}>
        <FormGroup>
          <Select>
            <option>
              <FormattedMessage id='monitors.above' />
            </option>
            <option>
              <FormattedMessage id='monitors.equal' />
            </option>
            <option>
              <FormattedMessage id='monitors.below' />
            </option>
          </Select>
        </FormGroup>
      </Column>
      <Column md={2} xs={12}>
        <FormGroup name='value'>
          <Input />
        </FormGroup>
      </Column>
      <Column md={2} xs={12}>
        <FormGroup>
          <Select>
            <option>
              <FormattedMessage id='monitors.average' />
            </option>
          </Select>
        </FormGroup>
      </Column>
      <TextColumn md={1}xs={12}>
        <Text>
          <FormattedMessage id='monitors.during' />
        </Text>
      </TextColumn>
      <Column md={3} xs={12}>
        <FormGroup>
          <Select>
            <option>
              <FormattedMessage id='monitors.last5' />
            </option>
          </Select>
        </FormGroup>
      </Column>
    </ConditionsRow>
    <H4>
      <FormattedMessage id='monitors.notification' />
    </H4>
    <P>
      <FormattedMessage id='monitors.notification-subtitle' />
    </P>
    <Row>
      <Column xs={12}>
        <FormGroup>
          <PeopleInput />
        </FormGroup>
      </Column>
    </Row>
    <Row>
      <Column xs={12}>
        <Button disabled={pristine || submitting} type='submit'>
          <FormattedMessage id='monitors.submit' />
        </Button>
      </Column>
    </Row>
  </form>
);

CreateMonitor.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool
};

module.exports = CreateMonitor;
