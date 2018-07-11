import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/pageDescriptionGallery.module.scss';
import WindowSize from './windowSize';
import Image from './image';

class PageDescriptionGallery extends Component {
	static propTypes = {
		images: PropTypes.array,
		windowWidth: PropTypes.number.isRequired
	};

	static defaultProps = {
		images: []
	};

	render() {
		const {images, windowWidth} = this.props;
		const colWidth = 100 / images.length;

		return (
			<div className={CSS.gallery}>
				<div className={CSS.galleryInner}>
					{images.map(item => {
						const {image, link} = item;

						const imageStyle = {
							width: windowWidth > 768 ? `${colWidth}%` : '50%'
						};

						return (
							<div key={image.id} className={CSS.galleryImage} style={imageStyle}>
								<a href={link} target="_blank" rel="noopener noreferrer">
									<Image image={image}/>
								</a>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default WindowSize(PageDescriptionGallery);
