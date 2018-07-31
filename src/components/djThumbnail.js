import React from 'react';
import PropTypes from 'prop-types';

import Image from './image';
import CSS from '../css/modules/djThumbnail.module.scss';

const DJThumbnail = ({image, height, width}) => {
	const imgStyle = {
		height,
		width,
		right: 0,
		margin: '0 auto'
	};

	const wrapStyle = {
		height: height + 21,
		width: width + 44
	};

	return (
		<div className={CSS.thumbnail} style={wrapStyle}>
			<Image circle image={image} imgStyle={imgStyle}/>
		</div>
	);
};

DJThumbnail.propTypes = {
	image: PropTypes.object.isRequired,
	height: PropTypes.number,
	width: PropTypes.number
};

DJThumbnail.defaultProps = {
	height: 250,
	width: 250
};

export default DJThumbnail;
