import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';

const AnyReactComponent = () => <Icon name='marker' size='big' color='red' />;

class SimpleMap extends Component {
	static defaultProps = {
		zoom: 11
	};

	render() {
    const { latlng } = this.props;
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '50vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyCqBdR0Z3nS5oSLJK5CW_KFL9wWD0wvslc' }}
					defaultCenter={latlng}
					defaultZoom={this.props.zoom}
				>
					<AnyReactComponent lat={latlng.lat} lng={latlng.lng} />
				</GoogleMapReact>
			</div>
		);
	}
}

export default SimpleMap;
