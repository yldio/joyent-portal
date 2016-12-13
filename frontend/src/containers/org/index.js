const React = require('react');
const ReactIntl = require('react-intl');
// const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');
// const Styled = require('styled-components');
//
// const Container = require('@ui/components/container');
// const fns = require('@ui/shared/functions');
//
const {
  FormattedMessage
} = ReactIntl;
//
// const {
//   connect
// } = ReactRedux;
//
// const {
//   Link,
//   Match
// } = ReactRouter;
//
// const {
//   default: styled
// } = Styled;
//
// const {
//   remcalc
// } = fns;

const Org = ({
  params
}) => {
  return (
    <h1>
      <FormattedMessage id='welcome-to' />
      <span> {params.org}</span>
    </h1>
  );
};

Org.propTypes = {
  params: React.PropTypes.shape({
    org: React.PropTypes.string
  })
};

module.exports = Org;
