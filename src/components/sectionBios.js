import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionBios.module.scss';
import {click, ref} from '../utils/componentHelpers';
import {bioPosition, bioName} from '../utils/wordpressHelpers';
import WindowSize from './windowSize';
import Section from './section';
import SectionContent from './sectionContent';
import Button from './button';
import DJThumbnail from './djThumbnail';

// eslint-disable-next-line react/no-deprecated
class SectionBios extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false,
			activeTab: 0,
			bioHeight: 0
		};

		this.bioList = null;

		this.handleTabClick = this.handleTabClick.bind(this);
	}

	static propTypes = {
		header: PropTypes.string,
		content: PropTypes.string,
		bios: PropTypes.array,
		windowWidth: PropTypes.number
	};

	static defaultProps = {
		header: null,
		content: null,
		bios: [],
		windowWidth: PropTypes.number
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				sectionActive: true
			});

			this.setBioListHeight();
		}, 300);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.windowWidth !== this.props.windowWidth) {
			this.setBioListHeight();
		}
	}

	setBioListHeight() {
		if (!this.bioList) {
			return;
		}

		const listItems = this.bioList.querySelectorAll('li');

		let maxHeight = 0;

		listItems.forEach(item => {
			if (item.offsetHeight > maxHeight) {
				maxHeight = item.offsetHeight;
			}
		});

		this.setState({
			bioHeight: maxHeight
		});
	}

	handleTabClick(activeTab) {
		this.setState({activeTab});
	}

	render() {
		const {sectionActive, activeTab, bioHeight} = this.state;
		const {header, content, bios} = this.props;
		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section id="sectionBios" slantDirection="leftToRight" backgroundColor="#FFF" angleHeight={75} angleBottom={false}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<div className={CSS.sectionHeader}>
							<SectionContent content={{header, content}} classname="sectionBiosContent" contentContainerWidth={950}/>
						</div>
						<div className={CSS.sectionBody}>
							<div className={CSS.bioTabs}>
								<div className={CSS.bioTabsHeader}>
									<ul>
										{bios.map((bio, index) => {
											const tabCss = [CSS.tab];

											if (index === activeTab) {
												tabCss.push(CSS.tabActive);
											}

											return (
												<li key={bio.title} className={tabCss.join(' ')} onClick={click(this.handleTabClick, index)}>
													{bioName(bio.title)}
												</li>
											);
										})}
									</ul>
								</div>
								<div className={CSS.bioTabsBody}>
									<ul ref={ref.call(this, 'bioList')} style={{height: bioHeight ? bioHeight : 'auto'}}>
										{bios.map((bio, index) => {
											const bioCss = [CSS.bioItem];

											if (index === activeTab) {
												bioCss.push(CSS.bioItemActive);
											}

											return (
												<li key={bio.title} className={bioCss.join(' ')}>
													<div className={CSS.bio}>
														<div className={CSS.bioLeft}>
															<div className={CSS.bioImage}>
																<DJThumbnail image={bio.image}/>
															</div>
															<h4 className={CSS.bioTitle}>{bioName(bio.title)}</h4>
															<p className={CSS.bioPosition}>{bioPosition(bio.title)}</p>
														</div>
														<div className={CSS.bioRight}>
															<div className={CSS.bioContent}>
																<p className={CSS.bioExcerpt}>{bio.excerpt}</p>
																<Button
																	classname="secondary"
																	to={bio.url}
																	style={{
																		display: 'block',
																		maxWidth: 230
																	}}
																>
																	Learn More
																</Button>
															</div>
														</div>
													</div>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionBios);
