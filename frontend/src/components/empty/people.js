const React = require('react');
const ReactIntl = require('react-intl');

const Column = require('@ui/components/column');
const Row = require('@ui/components/row');

const {
  FormattedMessage
} = ReactIntl;

module.exports = () => (
  <Row>
    <Column xs={12}>
      <p name='empty'>
        <FormattedMessage id='no-people' />
      </p>
    </Column>
  </Row>
);

