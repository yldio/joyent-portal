const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');
//
const Column = require('@ui/components/column');
// const Button = require('@ui/components/button');
const Row = require('@ui/components/row');

const {
  FormattedMessage
} = ReactIntl;

const {
  connect
} = ReactRedux;

// const {
//   Link,
//   Match,
//   Miss,
//   Redirect
// } = ReactRouter;

const Settings = () => {
  return (
    <Row>
      <Column xs={12}>
        <FormattedMessage id='your-settings' />
      </Column>
    </Row>
  );
};

Settings.propTypes = {
  Settings: React.PropTypes.array
};

const mapStateToProps = (state) => ({
  Settings: state.session.data.Settings
});

module.exports = connect(mapStateToProps)(Settings);
