const React = require('react');
const Select = require('react-select');
const SelectAsync = Select.Async


const SearchAsync = React.createClass({

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

	options: function(input, callback) {
		setTimeout(function() {
			callback(null, {
				options: [
					{ value: 'one', label: 'One' },
					{ value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three' },
					{ value: 'four', label: 'Four' },
					{ value: 'five', label: 'Five' },
					{ value: 'six', label: 'Six' },
				],
				// CAREFUL! Only set this to true when there are no more options,
				// or more specific queries will not be sent to the server.
				complete: true
			}, 10000);
		});
	},

	render: function () {

		return (
			<div>
				<h1> Async Search </h1>
				<SelectAsync
					ref="stateSelectAsync"
					loadOptions={this.options}
					value={this.state.selectValue}
					onChange={this.updateValue}
					multi={true}
				/>
			</div>
		)
	}
})

module.exports = SearchAsync