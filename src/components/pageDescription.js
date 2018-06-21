import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/pageDescription.module.scss';
import Section from './section';
import SectionContent from './sectionContent';
import Image from './image';

export default class PageDescription extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoBleed: 0,
			active: false
		};

		this.section = null;

		// This.handleWindowResize = this.handleWindowResize.bind(this);
	}

	static propTypes = {
		content: PropTypes.array,
		images: PropTypes.array,
		id: PropTypes.string,
		view: PropTypes.oneOf(['content', 'images']),
		zIndex: PropTypes.number
	};

	static defaultProps = {
		content: [],
		images: [],
		id: 'pageDescription',
		view: 'content',
		zIndex: 0
	};

	componentDidMount() {
		window.addEventListener('resize', ::this.handleWindowResize);

		setTimeout(() => {
			this.handleWindowResize();

			this.setState({
				active: true
			});
		}, 150);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', ::this.handleWindowResize);
	}

	handleWindowResize() {
		const heroVideo = document.querySelector('#heroVideo');
		const section = document.querySelector(`#${this.props.id}`);

		if (!heroVideo) {
			return;
		}

		const heroRect = heroVideo.getBoundingClientRect();
		const sectionRect = section.getBoundingClientRect();
		const sectionChild = section
			.querySelector('div')
			.querySelector('div')
			.querySelector('div');
		const sectionPadding = sectionChild.style.paddingTop;

		// Const videoBleed = heroRect.bottom - sectionRect.top - parseInt(sectionPadding, 10);
		const videoBleed = heroRect.bottom - sectionChild.getBoundingClientRect().top;

		console.log(videoBleed);

		this.setState({
			videoBleed: videoBleed > 0 ? videoBleed : 0
		});
	}

	render() {
		const {id, content, images, view, zIndex} = this.props;
		const {videoBleed, active} = this.state;

		const sectionStyle = {
			paddingTop: videoBleed
		};

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push([CSS.sectionActive]);
		}

		return (
			<Section id={id} classname="pageDescription" slantDirection="rightToLeft" backgroundColor="white" style={{padding: 0, zIndex}}>
				<div className={sectionCss.join(' ')} style={sectionStyle}>
					<div className={CSS.sectionInner}>
						<div className="container">
							{view === 'content' ? <SectionContent content={content} contentContainerWidth={720}/> : this.renderImages(images)}
						</div>
					</div>
				</div>
			</Section>
		);
	}

	renderImages(images) {
		const colWidth = 100 / images.length;
		return (
			<div className={CSS.gallery}>
				<div className={CSS.galleryInner}>
					{images.map(item => {
						const {image, link} = item;

						const imageStyle = {
							width: typeof window !== 'undefined' && window.innerWidth > 768 ? `${colWidth}%` : '100%'
						};

						return (
							<div key={image.id} className={CSS.galleryImage} style={imageStyle}>
								<a href={link} target="_blank">
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
