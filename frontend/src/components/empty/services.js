const React = require('react');
const ReactIntl = require('react-intl');

const Button = require('@ui/components/button');
const Column = require('@ui/components/column');
const Row = require('@ui/components/row');
const BaseElements = require('@ui/components/base-elements');

const {
  P,
  H3,
} = BaseElements;

const {
  FormattedMessage
} = ReactIntl;

module.exports = () => (
  <div>
    <Row name='empty-services'>
      <Column md={6} xs={12}>
        <H3>
          <FormattedMessage id='add-services' />
        </H3>
        <P>
          <FormattedMessage id='no-services' />
        </P>
      </Column>
    </Row>
    <Row>
      <Column xs={12}>
        <Button>
          <FormattedMessage id='edit-project-manifest' />
        </Button>
      </Column>
    </Row>
    <Row>
      <Column xs={12}>
        <P>
          <FormattedMessage id='or-bring-in-from' />
        </P>

        <Button secondary>GitHub</Button>
        <Button secondary>BitBucket</Button>

      </Column>
    </Row>
  </div>
);
