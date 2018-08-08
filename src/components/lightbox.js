import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';

import {ref} from '../utils/componentHelpers';
import Modal from './modal';
import Image from './image';
import WindowSize from './windowSize';
import Close from './close';
import CSS from '../css/modules/lightbox.module.scss';

// eslint-disable-next-line react/no-deprecated
class Lightbox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialized: false
		};

		this.swiper = null;
		this.wrapper = null;
		this.next = null;
		this.prev = null;

		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePrevClick = this.handlePrevClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalShow = this.handleModalShow.bind(this);
		this.currentIndex = this.currentIndex.bind(this);
	}

	static propTypes = {
		images: PropTypes.array,
		open: PropTypes.bool,
		start: PropTypes.number,
		onClose: PropTypes.func,
		onShow: PropTypes.func,
		windowWidth: PropTypes.number.isRequired,
		windowHeight: PropTypes.number.isRequired
	};

	static defaultProps = {
		images: [],
		open: false,
		start: 1,
		onClose: () => {},
		onShow: () => {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.start !== this.props.start) {
			this.goToSlide(nextProps.start);
		}
	}

	init() {
		if (!this.wrapper) {
			return;
		}

		if (this.swiper) {
			this.swiper.destroy();
		}

		const container = this.wrapper.querySelector('.swiper-container');
		const nextEl = this.wrapper.querySelector('.swiper-button-next');
		const prevEl = this.wrapper.querySelector('.swiper-button-prev');

		const defaultOptions = {
			centeredSlides: true,
			loop: false,
			direction: 'horizontal',
			pagination: false,
			slidesPerView: 1,
			spaceBetween: 0,
			grabCursor: true,
			initialSlide: this.props.start,
			navigation: {
				nextEl,
				prevEl
			}
		};

		this.swiper = new Swiper(container, defaultOptions);
		this.swiper.update();

		this.setState({
			initialized: true
		});
	}

	destroy() {
		if (!this.swiper) {
			return;
		}

		this.swiper.destroy();
		this.swiper = null;
		this.slider = null;
	}

	goToSlide(index) {
		if (!this.swiper) {
			return;
		}

		this.swiper.slideTo(index, 0);
	}

	currentIndex() {
		if (!this.swiper) {
			return 0;
		}

		return this.swiper.realIndex;
	}

	handlePrevClick() {
		this.swiper.slidePrev();
	}

	handleNextClick() {
		this.swiper.slideNext();
	}

	handleModalClose() {
		this.props.onClose();
	}

	handleModalShow() {
		// If the display is none on the modal, the swiper will not fully initialize
		// This.init();
		this.init();

		this.props.onShow();
	}

	render() {
		const {images, open} = this.props;
		const {initialized} = this.state;

		const wrapperCss = [CSS.wrapper];

		if (initialized) {
			wrapperCss.push([CSS.wrapperActive]);
		}

		return (
			<Modal
				showClose={false}
				size="full"
				active={open}
				onClose={this.handleModalClose}
				onShow={this.handleModalShow}
				backgroundColor="transparent"
			>
				<div ref={ref.call(this, 'wrapper')} className={wrapperCss.join(' ')}>
					<div className={CSS.inner}>
						<div className="swiper-container" style={{height: '100%'}}>
							<div className="swiper-wrapper" style={{height: '100%'}}>
								{images.map(image => {
									const {height: imageHeight, width: imageWidth} = image.mediaDetails;

									let style = {
										height: '100%',
										width: '100%'
									};

									let imgStyle = {
										left: 0,
										right: 0,
										margin: '0 auto'
									};

									if (imageHeight > imageWidth) {
										imgStyle = {
											...imgStyle,
											height: '100%',
											width: 'auto'
										};
									}

									return (
										<div key={image.id} className="swiper-slide">
											<div
												style={{
													height: '100%',
													width: '100%',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<Image image={{...image, localFile: null}} style={style} imgStyle={imgStyle}/>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={CSS.close}>
						<Close onClick={this.handleModalClose}/>
					</div>
					<div className={[CSS.prev, 'swiper-button-prev'].join(' ')}>
						<span className="si-arrow-left"/>
					</div>
					<div className={[CSS.next, 'swiper-button-next'].join(' ')}>
						<span className="si-arrow-right"/>
					</div>
				</div>
			</Modal>
		);
	}
}

export default WindowSize(Lightbox);
