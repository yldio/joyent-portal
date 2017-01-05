const React = require('react');
const Select = require('react-select');
const {
	Async
} = Select

const SelectAsync = Async


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

	render: function () {

		const options = function(input, callback) {
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
				}, 1000);
			});
		}

		return (
			<div>
				<h1> Async Search </h1>
				<SelectAsync
					ref="stateSelect"
					loadOptions={options}
					value={this.state.selectValue}
					isLoading={true}
					onChange={this.updateValue}
					multi={this.props.multi}
				/>
			</div>
		)
	}
})

module.exports = SearchAsync