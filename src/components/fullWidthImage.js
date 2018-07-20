import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Section from './section';
import Image from './image';

export default class FullWidthImage extends Component {
	static propTypes = {
		image: PropTypes.object.isRequired,
		disableSlantTop: PropTypes.bool,
		disableSlantBottom: PropTypes.bool,
		slantDirection: PropTypes.string
	};

	static defaultProps = {
		disableSlantBottom: false,
		disableSlantTop: false,
		slantDirection: 'leftToRight'
	};

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
				<Image image={image}/>
			</Section>
		);
	}
}
