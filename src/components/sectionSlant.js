import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionSlant.module.scss';
import Image from './image';
import SectionContent from './sectionContent';
import Section from './section';
import WindowSize from './windowSize';

class SectionSlant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
	}

	static propTypes = {
		style: PropTypes.object,
		slantDirection: PropTypes.oneOf(['leftToRight', 'rightToLeft']),
		windowWidth: PropTypes.number.isRequired,
		content: PropTypes.object,
		image: PropTypes.object,
		id: PropTypes.string,
		slantTop: PropTypes.bool,
		slantBottom: PropTypes.bool
	};

	static defaultProps = {
		style: {},
		slantDirection: 'rightToLeft',
		content: {},
		image: {},
		id: '',
		slantTop: true,
		slantBottom: true
	};

	handleImageLoad() {
		this.setState({
			sectionActive: true
		});
	}

	render() {
		const {slantDirection, windowWidth, id, slantTop, slantBottom} = this.props;
		const {sectionActive} = this.state;
		const contentAlign = slantDirection === 'rightToLeft' ? 'right' : 'left';

		const sectionCss = [CSS.section, CSS.sectionActive];

		if (slantTop === false) {
			sectionCss.push(CSS.noSlantTop);
		}

		if (slantBottom === false) {
			sectionCss.push(CSS.noSlantBottom);
		}

		const innerStyle = {
			minHeight: windowWidth > 992 ? 700 : 'none'
		};

		return (
			<Section
				id={id}
				slantDirection={this.props.slantDirection}
				setPadding={false}
				angleHeight={200}
				breakpoint={992}
				angleTop={slantTop}
				angleBottom={slantBottom}
			>
				<div className={sectionCss.join(' ')}>
					{contentAlign === 'left' && windowWidth > 992 ? (
						<div className={CSS.inner} style={innerStyle}>
							{this.renderContent()}
							{this.renderImage()}
						</div>
					) : (
						<div className={CSS.inner} style={innerStyle}>
							{this.renderImage()}
							{this.renderContent()}
						</div>
					)}
				</div>
			</Section>
		);
	}

	renderContent() {
		const {content} = this.props;

		return (
			<div className={CSS.content}>
				<div className={CSS.contentInner}>
					<SectionContent classname="sectionSlant" contentContainerWidth={580} content={content}/>
				</div>
			</div>
		);
	}

	renderImage() {
		const {image} = this.props;

		return (
			<div className={CSS.imageWrap}>
				<div className={CSS.image}>
					<Image image={image} onLoad={this.handleImageLoad}/>
				</div>
			</div>
		);
	}
}

export default WindowSize(SectionSlant);
