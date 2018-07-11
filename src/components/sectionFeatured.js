import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionFeatured.module.scss';
import Section from './section';
import WindowSize from './windowSize';
import SectionContent from './sectionContent';
import Image from './image';

class SectionFeatured extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
	}

	static propTypes = {
		content: PropTypes.object,
		image: PropTypes.object
	};

	static defaultProps = {
		content: {},
		image: {}
	};

	handleImageLoad() {
		this.setState({
			sectionActive: true
		});
	}

	render() {
		const {sectionActive} = this.state;

		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}
		return (
			<Section id="sectionFeatured" angleTop={false} angleBottom={false} angleHeight={0}>
				<div className={CSS.wrap}>
					<div className={CSS.image}>
						<Image onLoad={this.handleImageLoad} image={this.props.image}/>
					</div>
					<div className={CSS.content}>
						<div className={CSS.contentInner}>
							<SectionContent content={this.props.content} contentContainerWidth={450} classname="sectionFeatured"/>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionFeatured);
