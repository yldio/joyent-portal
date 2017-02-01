const React = require('react');
const ReactIntl = require('react-intl');

const Column = require('@ui/components/column');
const Row = require('@ui/components/row');
const BaseElements = require('@ui/components/base-elements');

const {
  P
} = BaseElements;

const {
  FormattedMessage
} = ReactIntl;

module.exports = () => (
  <Row>
    <Column xs={12}>
      <P name='empty'>
        <FormattedMessage id='no-instances' />
      </P>
    </Column>
  </Row>
);
