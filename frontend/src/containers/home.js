const React = require('react');
const ReactIntl = require('react-intl');

const {
  FormattedMessage
} = ReactIntl;

module.exports = () => {
  return (
    <div>
      <h1>
        <FormattedMessage id='greetings' />
      </h1>
    </div>
  );
};
