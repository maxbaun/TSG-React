import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import CSS from '../css/modules/gallery.module.scss';
import Image from './image';
import WindowSize from './windowSize';
import LightBox from './lightbox';
import Loading from './loading';
import {clickPrevent} from '../utils/componentHelpers';

class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false,
			modalStart: 0
		};

		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
	}

	static propTypes = {
		images: PropTypes.array.isRequired,
		loading: PropTypes.bool
	};

	static defaultProps = {
		loading: false
	};

	handleModalClose() {
		this.setState({
			modalOpen: false
		});
	}

	handleImageClick(modalStart) {
		this.setState({
			modalStart,
			modalOpen: true
		});
	}

	render() {
		const {images, loading} = this.props;

		return (
			<div className={CSS.wrap}>
				{loading ? (
					<div className={CSS.loader}>
						<Loading/>
					</div>
				) : null}
				<Masonry
					className={CSS.gallery}
					elementType="ul" // Default 'div'
					disableImagesLoaded={false} // Default false
					updateOnEachImageLoad={false} // Default false and works only if disableImagesLoaded is false
				>
					{images.map((image, index) => {
						return (
							<li key={image.id}>
								<a href={image.url} onClick={clickPrevent(this.handleImageClick, index)}>
									<Image showPlacholder image={image}/>
								</a>
							</li>
						);
					})}
				</Masonry>
				<LightBox images={images} open={this.state.modalOpen} start={this.state.modalStart} onClose={this.handleModalClose}/>
			</div>
		);
	}
}

export default WindowSize(Gallery);
