import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class TestPlaceInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
		};
	}

	handleChange = address => {
		this.setState({ address });
	};

	render() {
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.props.handleSelect}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div>
						<input
							style={{ marginBottom: '10px', borderRadius: '5px' }}
							{...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input',
							})}
						/>
						<hr />
						<div style={{ marginTop: '10px' }} className='autocomplete-dropdown-container'>
							{loading && <div>Loading...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default TestPlaceInput;
