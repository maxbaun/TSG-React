import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

import CSS from '../css/modules/hero.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Button from './button';
import Video from './video';

export default class Hero extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			activeImage: 0
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.renderVideo = this.renderVideo.bind(this);
	}

	static propTypes = {
		images: PropTypes.array.isRequired,
		title: PropTypes.string,
		subtitle: PropTypes.string,
		linkText: PropTypes.string,
		linkUrl: PropTypes.string,
		videoUrl: PropTypes.string,
		videoImage: PropTypes.object
	};

	static defaultProps = {
		linkText: null,
		linkUrl: null,
		title: null,
		subtitle: null,
		videoUrl: null,
		videoImage: {}
	};

	componentDidMount() {
		if (this.props.images.length > 1) {
			this.startTransition();
		}
	}

	startTransition() {
		setInterval(() => {
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
		const {images, title, subtitle, linkText, linkUrl, videoUrl} = this.props;
		const {loaded, activeImage} = this.state;
		const showContent = title && title !== '';

		const contentCss = [CSS.contentWrap];

		if (loaded) {
			contentCss.push(CSS.contentActive);
		}

		const heroCss = [CSS.hero];

		if (showContent) {
			heroCss.push(CSS.hasOverlay);
		}

		return (
			<div>
				<div className={heroCss.join(' ')}>
					<div className={CSS.inner}>
						<div className={CSS.images}>
							{images.map((image, index) => {
								const sizes = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.sizes : null;
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
										{sizes ? <Img sizes={sizes} imgStyle={{objectPosition: 'top center'}} onLoad={this.handleImageLoad}/> : null}
									</div>
								);
							})}
							<div className={CSS.overlay}/>
						</div>
						{showContent ? (
							<div className={contentCss.join(' ')}>
								<div className={CSS.content}>
									{/* eslint-disable-next-line react/no-danger */}
									<h1 dangerouslySetInnerHTML={innerHtml(title)}/>
									{/* eslint-disable-next-line react/no-danger */}
									<h3 dangerouslySetInnerHTML={innerHtml(subtitle)}/>
								</div>
								{linkUrl ? (
									<Button
										to={linkUrl}
										classname="primary"
										style={{
											display: 'block',
											maxWidth: 268,
											margin: '0 auto'
										}}
									>
										{linkText}
									</Button>
								) : null}
								{videoUrl ? this.renderVideo() : null}
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}

	renderVideo(video) {
		const {videoUrl, videoImage} = this.props;

		return (
			<div id="heroVideo" className={CSS.video}>
				<div className={CSS.videoInner}>
					<Video videoUrl={videoUrl} videoThumbnail={videoImage}/>
				</div>
			</div>
		);
	}
}
