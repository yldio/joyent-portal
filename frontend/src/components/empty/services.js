const React = require('react');
const ReactIntl = require('react-intl');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const Row = require('@ui/components/row');

const {
  FormattedMessage
} = ReactIntl;

module.exports = () => (
  <div>
    <Row name='empty-services'>
      <Column md={6} xs={12}>
        <h3>
          <FormattedMessage id='add-services' />
        </h3>
        <p>
          <FormattedMessage id='no-services' />
        </p>
      </Column>
    </Row>
    <Row>
      <Button>
        <FormattedMessage id='edit-project-manifest' />
      </Button>
    </Row>
    <Row>
      <p>
        <FormattedMessage id='or-bring-in-from' />
      </p>
    </Row>
    <Row>
      <Column>
        <Button secondary>GitHub</Button>
      </Column>
      <Column>
        <Button secondary>BitBucket</Button>
      </Column>
    </Row>
  </div>
);
