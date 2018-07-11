import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

export default class Image extends Component {
	static propTypes = {
		image: PropTypes.object
	};

	static defaultProps = {
		image: {}
	};

	render() {
		const {image} = this.props;

		if (!image) {
			return null;
		}

		const sizes = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.sizes : null;
		const resolutions = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.resolutions : null;

		const props = {...this.props};

		if (sizes) {
			return <Img {...props} sizes={sizes}/>;
		}

		if (resolutions) {
			return <Img {...props} resolutions={resolutions}/>;
		}

		return null;
	}
}
