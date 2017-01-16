const React = require('react');
const ReactIntl = require('react-intl');
const Styled = require('styled-components');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const Input = require('@ui/components/input');
const fns = require('@ui/shared/functions');
const Row = require('@ui/components/row');
const Select = require('@ui/components/select');

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
  margin: 0 0 0 auto !important;
`;

const PeopleInput = styled(Input)`
  margin-bottom: ${remcalc(24)} !important;
`;

module.exports = () => {
  return (
    <div>
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
        </Column>
        <Column md={2} xs={12}>
          <Input placeholder='value' />
        </Column>
        <Column md={2} xs={12}>
          <Select>
            <option>
              <FormattedMessage id='monitors.average' />
            </option>
          </Select>
        </Column>
        <TextColumn md={1}xs={12}>
          <Text>
            <FormattedMessage id='monitors.during' />
          </Text>
        </TextColumn>
        <Column md={3} xs={12}>
          <Select>
            <option>
              <FormattedMessage id='monitors.last5' />
            </option>
          </Select>
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
          <PeopleInput />
        </Column>
      </Row>
      <Row>
        <Column xs={12}>
          <Button>
            <FormattedMessage id='monitors.submit' />
          </Button>
        </Column>
      </Row>
    </div>
  );
};
