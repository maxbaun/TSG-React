import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/pageDescription.module.scss';
import Section from './section';
import SectionContent from './sectionContent';
import PageDescriptionGallery from './pageDescriptionGallery';
import Video from './video';

export default class PageDescription extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoBleed: 0,
			active: false
		};

		this.section = null;
	}

	static propTypes = {
		video: PropTypes.object,
		content: PropTypes.object,
		images: PropTypes.array,
		id: PropTypes.string,
		view: PropTypes.oneOf(['content', 'images']),
		zIndex: PropTypes.number,
		angleBottom: PropTypes.bool,
		angleTop: PropTypes.bool
	};

	static defaultProps = {
		video: null,
		content: {},
		images: [],
		id: 'pageDescription',
		view: 'content',
		zIndex: 0,
		angleBottom: true,
		angleTop: true
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

		const sectionChild = section
			.querySelector('div')
			.querySelector('div')
			.querySelector('div');

		// Const videoBleed = heroRect.bottom - sectionRect.top - parseInt(sectionPadding, 10);
		const videoBleed = heroRect.bottom - sectionChild.getBoundingClientRect().top;

		this.setState({
			videoBleed: videoBleed > 0 ? videoBleed : 0
		});
	}

	render() {
		const {id, content, images, view, zIndex, angleBottom, video, angleTop} = this.props;
		const {videoBleed, active} = this.state;

		const sectionStyle = {
			paddingTop: videoBleed
		};

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push([CSS.sectionActive]);
		}

		return (
			<Section
				id={id}
				classname="pageDescription"
				slantDirection="rightToLeft"
				backgroundColor="white"
				style={{padding: 0, zIndex}}
				angleTop={angleTop}
				angleBottom={angleBottom}
				breakpoint={992}
			>
				<div className={sectionCss.join(' ')} style={sectionStyle}>
					<div className={CSS.sectionInner}>
						<div className="container">
							{view === 'content' ? (
								<SectionContent content={content} contentContainerWidth={720}/>
							) : (
								<PageDescriptionGallery images={images}/>
							)}
							<div className={CSS.video}>{video && video.url ? <Video {...video}/> : null}</div>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}
