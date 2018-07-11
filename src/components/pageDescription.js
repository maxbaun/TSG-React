import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/pageDescription.module.scss';
import Section from './section';
import SectionContent from './sectionContent';
import PageDescriptionGallery from './pageDescriptionGallery';

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
		content: PropTypes.object,
		images: PropTypes.array,
		id: PropTypes.string,
		view: PropTypes.oneOf(['content', 'images']),
		zIndex: PropTypes.number,
		angleBottom: PropTypes.bool
	};

	static defaultProps = {
		content: {},
		images: [],
		id: 'pageDescription',
		view: 'content',
		zIndex: 0,
		angleBottom: true
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
		const {id, content, images, view, zIndex, angleBottom} = this.props;
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
				angleBottom={angleBottom}
			>
				<div className={sectionCss.join(' ')} style={sectionStyle}>
					<div className={CSS.sectionInner}>
						<div className="container">
							{view === 'content' ? (
								<SectionContent content={content} contentContainerWidth={720}/>
							) : (
								<PageDescriptionGallery images={images}/>
							)}
						</div>
					</div>
				</div>
			</Section>
		);
	}
}
