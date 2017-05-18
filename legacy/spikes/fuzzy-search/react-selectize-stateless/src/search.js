const actions = require('./actions');
const React = require('react');
const axios = require('axios');
const users = require('../../users');

const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;



const Search = () => {

	let _options = ["apple", "mango", "grapes", "melon", "strawberry"];
	_options = _options.map(function(fruit){
		return {label: fruit, value: fruit}
	});

	return (
		<SimpleSelect
			options={_options}
			placeholder="Select a fruit"
			theme="material"
		/>
	);
}

module.exports = Search;

