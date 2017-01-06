const React = require('react');
const Select = require('react-select');


const Search = React.createClass({

	getInitialState: function() {
		return {
			selectValue: ''
		}
	},

	updateValue: function(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},

	render: function () {

		var options = [
			{ value: 'one', label: 'One' },
			{ value: 'two', label: 'Two' },
			{ value: 'three', label: 'Three' },
			{ value: 'four', label: 'Four' },
			{ value: 'five', label: 'Five' },
			{ value: 'six', label: 'Six' },
		];

		return (
			<div>
				<h1> {this.props.multi ? 'Multi' : 'Single'} Search </h1>
				<Select
					ref="stateSelect"
					className="is-open"
					autofocus
					options={options}
					name="selected-state"
					value={this.state.selectValue}
					onChange={this.updateValue}
					multi={this.props.multi}
				/>
			</div>
		)
	}
})

module.exports = Search