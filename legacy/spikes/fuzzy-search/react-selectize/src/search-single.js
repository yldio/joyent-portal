const ReactRedux = require('react-redux');
const actions = require('./actions');
const React = require('react');
const axios = require('axios');
const users = require('../../users');

var ReactSelectize = require("react-selectize");
var SimpleSelect = ReactSelectize.SimpleSelect;

const {
	connect
} = ReactRedux;

const {
	fetch
} = actions;

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetch: () => {
			return dispatch(fetch());
		}
	}
};

const Search = React.createClass({

	getInitialState: function(){
		return {
			countries: [],
			country: undefined
		};
	},

	componentWillMount: function(){
		var self = this;
		this.req = axios.get("http://restverse.com/countries").then(function(countries){
			self.setState({countries: countries.data}, function(){
				self.refs.select.highlightFirstSelectableOption();
			});
		});
	},

	render: function(){
		var self = this;

		const _onValueChange = (country) => {
			self.setState({country: country});
		}

		const _renderNoResultsFound = () => {
			return (
				<div className = "no-results-found">
					{!!self.req ? "loading countries ..." : "No results found"}
				</div>
			)
		}


		return (
			<div>
				<h1>Single Select</h1>
				<SimpleSelect
					ref = "select"
					placeholder = "Select a country"
					options = {this.state.countries}
					value = {this.state.country}
					onValueChange = {_onValueChange}
					renderNoResultsFound = {_renderNoResultsFound}
				/>

				{ !!self.state.country ? (
						<div style = {{margin: 8}}>
							<span>you selected: </span>
							<span style = {{fontWeight: "bold"}}>{self.state.country.label}</span>
						</div>
					) : null }
			</div>
		)
	}
})

module.exports = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Search);
