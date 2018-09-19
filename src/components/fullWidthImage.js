import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Section from './section';
import Image from './image';
import WindowSize from './windowSize';

class FullWidthImage extends Component {
	constructor(props) {
		super(props);

		this.handleImageLoad = this.handleImageLoad.bind(this);
	}

	static propTypes = {
		image: PropTypes.object.isRequired,
		disableSlantTop: PropTypes.bool,
		disableSlantBottom: PropTypes.bool,
		slantDirection: PropTypes.string,
		windowWidth: PropTypes.number.isRequired
	};

	static defaultProps = {
		disableSlantBottom: false,
		disableSlantTop: false,
		slantDirection: 'leftToRight'
	};

	handleImageLoad() {
		this.setState({loaded: true});
	}

	render() {
		const {image, disableSlantBottom, disableSlantTop, slantDirection} = this.props;

		return (
			<Section
				id="fullWidthImage"
				slantDirection={slantDirection}
				setPadding={false}
				angleHeight={100}
				breakpoint={992}
				spacingTop={100}
				angleTop={!disableSlantTop}
				angleBottom={!disableSlantBottom}
			>
				<Image image={image} size="large" onLoad={this.handleImageLoad}/>
			</Section>
		);
	}
}

export default WindowSize(FullWidthImage);
