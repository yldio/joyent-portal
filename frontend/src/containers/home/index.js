const React = require('react');
const ReactIntl = require('react-intl');
const styles = require('./home.css');

const {
  FormattedMessage
} = ReactIntl;

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>
        <FormattedMessage id='greetings' />
      </h1>
    </div>
  );
};

module.exports = Home;
