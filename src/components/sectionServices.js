import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionServices.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Section from './section';
import WindowSize from './windowSize';
import SectionContent from './sectionContent';
import Image from './image';

class SectionServices extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};
	}

	static propTypes = {
		content: PropTypes.object,
		services: PropTypes.array
	};

	static defaultProps = {
		content: {},
		services: []
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				sectionActive: true
			});
		}, 300);
	}

	render() {
		const {content, services} = this.props;
		const {sectionActive} = this.state;

		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section id="sectionServices" angleTop={false} angleBottom={false} angleHeight={0}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<div className={CSS.sectionHeader}>
							<SectionContent content={content} classname="sectionServices"/>
						</div>
						<div className={CSS.sectionBody}>
							<div className={CSS.services}>
								<ul>
									{services &&
										services.map(service => {
											return (
												<li key={service.title}>
													<div className={CSS.service}>
														<div className={CSS.serviceImage}>
															<Image image={service.image} size="medium"/>
														</div>
														<div className={CSS.serviceContent}>
															<h4>{service.title}</h4>
															{/* eslint-disable-next-line react/no-danger */}
															<div dangerouslySetInnerHTML={innerHtml(service.text)}/>
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
			</Section>
		);
	}
}

export default WindowSize(SectionServices);
