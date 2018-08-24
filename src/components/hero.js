import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/hero.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Button from './button';
import Video from './video';
import Image from './image';

export default class Hero extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			activeImage: 0
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.renderVideo = this.renderVideo.bind(this);
		this.interval = null;
	}

	static propTypes = {
		images: PropTypes.array.isRequired,
		title: PropTypes.string,
		subtitle: PropTypes.string,
		link: PropTypes.object,
		video: PropTypes.object
	};

	static defaultProps = {
		link: {},
		title: null,
		subtitle: null,
		video: {}
	};

	componentDidMount() {
		if (this.props.images.length > 1) {
			this.startTransition();
		}
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	startTransition() {
		this.interval = setInterval(() => {
			this.setState(prevState => {
				let nextIndex = prevState.activeImage + 1;

				if (nextIndex === this.props.images.length) {
					nextIndex = 0;
				}

				return {
					activeImage: nextIndex
				};
			});
		}, 5000);
	}

	handleImageLoad() {
		this.setState({loaded: true});
	}

	render() {
		const {images, title, subtitle, link, video} = this.props;
		const {loaded, activeImage} = this.state;
		const showContent = title && title !== '';
		const hasSubtitle = subtitle && subtitle !== '';
		const hasVideo = video && video.url && video.url !== '';

		const contentCss = [CSS.contentWrap];
		const heroCss = [CSS.hero];

		if (loaded) {
			contentCss.push(CSS.contentActive);
			heroCss.push(CSS.heroActive);
		}

		if (hasVideo) {
			heroCss.push(CSS.hasVideo);
		}

		if (showContent) {
			heroCss.push(CSS.hasOverlay);
		}

		if (hasSubtitle) {
			contentCss.push(CSS.hasSubtitle);
		}

		return (
			<div className={heroCss.join(' ')}>
				<div className={CSS.inner}>
					<div className={CSS.images}>
						{images.map((image, index) => {
							const imageCss = [CSS.image];
							let imageStyle = {
								opacity: 0
							};

							if (index === activeImage) {
								imageStyle = {
									...imageStyle,
									opacity: 1
								};
							}

							return (
								<div key={image.id} className={imageCss.join(' ')} style={imageStyle}>
									<Image image={image} imgStyle={{objectPosition: 'top center'}} onLoad={this.handleImageLoad}/>
								</div>
							);
						})}
						<div className={CSS.overlay}/>
					</div>
					{showContent ? (
						<div className={contentCss.join(' ')}>
							<div className={CSS.contentInner}>
								<div className={CSS.content}>
									{/* eslint-disable-next-line react/no-danger */}
									<h1 dangerouslySetInnerHTML={innerHtml(title)}/>
									{/* eslint-disable-next-line react/no-danger */}
									{hasSubtitle ? <h3 dangerouslySetInnerHTML={innerHtml(subtitle)}/> : null}
								</div>
								{link && link.url ? (
									<div className={CSS.cta}>
										<Button
											to={link.url}
											classname="primary"
											style={{
												display: 'block',
												maxWidth: 268,
												margin: '0 auto'
											}}
										>
											{link.title}
										</Button>
									</div>
								) : null}
								{video && video.url ? this.renderVideo(video) : null}
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}

	renderVideo(video) {
		const {url, thumbnail} = video;

		return (
			<div id="heroVideo" className={CSS.video}>
				<div className={CSS.videoInner}>
					<Video url={url} thumbnail={thumbnail}/>
				</div>
			</div>
		);
	}
}
