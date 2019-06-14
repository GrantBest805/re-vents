import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMaps';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const mapState = state => ({
	data: state.test.data,
});

const actions = {
	incrementCounter,
	decrementCounter,
};

class TestComponent extends Component {
	state = {
		latlng: {
			lat: 59.95,
			lng: 30.33
		}
	}

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				this.setState({
					latlng: latLng,
				});
			})
			.catch(error => console.error('Error', error));
	};

	render() {
		const { incrementCounter, decrementCounter, data } = this.props;
		return (
			<div>
				<h1>Test Area</h1>
				<h3>The Answer is: {data} </h3>
				<Button onClick={incrementCounter} color='green' content='Increment' />
				<Button onClick={decrementCounter} color='red' content='Decrement' />
				<br />
				<br />
				<TestPlaceInput handleSelect={this.handleSelect}/>
				<SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng}/>
			</div>
		);
	}
}

export default connect(
	mapState,
	actions
)(TestComponent);
