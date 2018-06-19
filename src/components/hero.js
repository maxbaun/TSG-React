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
			loaded: false
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.renderVideo = this.renderVideo.bind(this);
	}

	static propTypes = {
		image: PropTypes.object.isRequired,
		title: PropTypes.string,
		subtitle: PropTypes.string,
		link: PropTypes.object,
		video: PropTypes.array
	};

	static defaultProps = {
		link: null,
		title: null,
		subtitle: null,
		video: []
	};

	handleImageLoad() {
		this.setState({loaded: true});
	}

	render() {
		const {image, title, subtitle, link, video} = this.props;
		const {loaded} = this.state;
		const sizes = image.localFile && image.localFile.childImageSharp ? image.localFile.childImageSharp.sizes : null;

		const contentCss = [CSS.contentWrap];

		if (loaded) {
			contentCss.push(CSS.contentActive);
		}

		return (
			<div>
				<div className={CSS.hero}>
					<div className={CSS.inner}>
						<div className={CSS.image}>
							{sizes ? <Img sizes={sizes} imgStyle={{objectPosition: 'top center'}} onLoad={this.handleImageLoad}/> : null}
						</div>
						<div className={CSS.overlay}/>
						<div className={contentCss.join(' ')}>
							<div className={CSS.content}>
								{/* eslint-disable-next-line react/no-danger */}
								<h1 dangerouslySetInnerHTML={innerHtml(title)}/>
								{/* eslint-disable-next-line react/no-danger */}
								<h3 dangerouslySetInnerHTML={innerHtml(subtitle)}/>
							</div>
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
							{video[0].videoUrl ? this.renderVideo(video[0]) : null}
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderVideo(video) {
		return (
			<div className={CSS.video}>
				<div className={CSS.videoInner}>
					<Video {...video}/>
				</div>
			</div>
		);
	}
}
