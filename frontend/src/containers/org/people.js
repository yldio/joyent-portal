const React = require('react');
// const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');

const Section = require('./section');

// const {
//   FormattedMessage
// } = ReactIntl;

const {
  connect
} = ReactRedux;

// const {
//   Link,
//   Match,
//   Miss,
//   Redirect
// } = ReactRouter;

const People = (props) => {
  return (
    <Section {...props}>
      <p>people</p>
    </Section>
  );
};

People.propTypes = {};

const mapStateToProps = (state) => ({});

module.exports = connect(mapStateToProps)(People);
