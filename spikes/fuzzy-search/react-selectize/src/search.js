const React = require('react');
const SearchSingle = require('./search-single');
const SearchMulti = require('./search-multi')

const Search = () => {

	return (
		<div>
			<SearchSingle />
			<SearchMulti />
		</div>
	)
}

module.exports = Search