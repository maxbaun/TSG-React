import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionAwards.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import WindowSize from './windowSize';
import Section from './section';
import PageDescriptionGallery from './pageDescriptionGallery';

// eslint-disable-next-line react/no-deprecated
class SectionAwards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};
	}

	static propTypes = {
		title: PropTypes.string,
		images: PropTypes.array,
		windowWidth: PropTypes.number.isRequired
	};

	static defaultProps = {
		title: null,
		images: []
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				sectionActive: true
			});
		}, 300);
	}

	handleTabClick(activeTab) {
		this.setState({activeTab});
	}

	render() {
		const {sectionActive} = this.state;
		const {title, images} = this.props;
		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section id="sectionBios" slantDirection="leftToRight" backgroundColor="#FBF2F7" angleHeightBottom={200} breakpoint={992}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<div className={CSS.sectionHeader}>
							{/* eslint-disable-next-line react/no-danger */}
							<h2 dangerouslySetInnerHTML={innerHtml(title)}/>
						</div>
						<div className={CSS.sectionBody}>
							<PageDescriptionGallery images={images}/>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionAwards);
