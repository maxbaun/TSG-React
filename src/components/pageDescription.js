import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/pageDescription.module.scss';
import Section from './section';
import SectionContent from './sectionContent';

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
		id: PropTypes.string
	};

	static defaultProps = {
		content: [],
		id: 'pageDescription'
	};

	componentDidMount() {
		window.addEventListener('resize', ::this.handleWindowResize);

		setTimeout(() => {
			this.handleWindowResize();

			this.setState({
				active: true
			});
		}, 1000);
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
		const sectionChild = section.querySelector('div').querySelector('div');
		const sectionPadding = sectionChild.style.paddingTop;

		const videoBleed = heroRect.bottom - sectionRect.top - parseInt(sectionPadding, 10);

		this.setState({
			videoBleed
		});
	}

	render() {
		const {id, content} = this.props;
		const {videoBleed, active} = this.state;

		const sectionStyle = {
			paddingTop: videoBleed
		};

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push([CSS.sectionActive]);
		}

		return (
			<Section id={id} classname="pageDescription" slantDirection="rightToLeft" backgroundColor="white" style={{padding: 0}}>
				<div className={sectionCss.join(' ')} style={sectionStyle}>
					<div className={CSS.sectionInner}>
						<div className="container">
							<SectionContent content={content} contentContainerWidth={720}/>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}
