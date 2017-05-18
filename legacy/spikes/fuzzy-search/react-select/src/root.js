const ReactRedux = require('react-redux');
const ReactHotLoader = require('react-hot-loader');
const React = require('react');
const Search = require('./search');
const SearchAsync = require('./search-async')

const {
  AppContainer
} = ReactHotLoader;

const {
  Provider
} = ReactRedux;

module.exports = ({
  store
}) => {
  return (
    <AppContainer>
      <div>
        <Search multi />
        <Search />
        <SearchAsync />
      </div>
    </AppContainer>
  );
};
