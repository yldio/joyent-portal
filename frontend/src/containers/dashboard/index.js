const React = require('react');
const ReactIntl = require('react-intl');
// const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');
// const Styled = require('styled-components');

// const fns = require('@ui/shared/functions');
//
const {
  FormattedMessage
} = ReactIntl;
//
// const {
//   connect
// } = ReactRedux;

// const {
//   Link,
//   Match
// } = ReactRouter;

// const {
//   default: styled
// } = Styled;
//
// const {
//   remcalc
// } = fns;

const Dashboard = (props) => {
  return (
    <h1>
      <FormattedMessage id='your-dashboard' />
    </h1>
  );
};

module.exports = Dashboard;
