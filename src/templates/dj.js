import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import DJThumbnail from '../components/djThumbnail';
import Image from '../components/image';
import Link from '../components/link';
import {djLink} from '../utils/linkHelpers';
import {bioPosition, bioName, innerHtml} from '../utils/wordpressHelpers';
import CSS from '../css/modules/dj.module.scss';

export default class DJTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			windowWidth: 0
		};

		this.getSectionComponent = this.getSectionComponent.bind(this);
		this.handleWindowResize = this.handleWindowResize.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize() {
		this.setState({
			windowWidth: window.innerWidth
		});
	}

	getSectionComponent(section) {
		let sectionKey = null;

		for (let key in SectionMap) {
			if (section[key]) {
				sectionKey = key;
			}
		}

		return React.createElement(SectionMap[sectionKey], section[sectionKey]);
	}

	render() {
		const {currentPage, site, djs} = this.props.data;

		const otherDjs = djs.edges ? djs.edges.map(dj => dj.node) : [];

		return (
			<div className={CSS.wrap}>
				<div className="container">
					<div className={CSS.dj}>
						<div className={CSS.image}>
							<DJThumbnail image={currentPage.image}/>
						</div>
						{/* eslint-disable-next-line react/no-danger */}
						<h1 dangerouslySetInnerHTML={innerHtml(bioName(currentPage.title))}/>
						<h3>{bioPosition(currentPage.title)}</h3>
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={innerHtml(currentPage.content)} className={CSS.content}/>
					</div>
					<div className={CSS.other}>
						<h4>Our Boston Wedding DJs</h4>
						<ul>
							{otherDjs.map(dj => {
								return (
									<li key={dj.title}>
										<div className={CSS.otherDJ}>
											<Link to={djLink(dj.slug)}>
												<div className={CSS.otherDJImage}>
													<Image image={dj.image}/>
												</div>
												<div className={CSS.otherDJOverlay}>
													{/* eslint-disable-next-line react/no-danger */}
													<h5 dangerouslySetInnerHTML={innerHtml(bioName(dj.title))}/>
												</div>
											</Link>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

import {DJ} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const pageQuery = graphql`
	query djTemplateQuery($id: String!) {
		currentPage: wordpressWpDj(id: {eq: $id}) {
			...DJ
		}
		site {
			...Site
		}
		djs: allWordpressWpDj(filter: {id: {ne: $id}}) {
			edges {
				node {
					...DJ
				}
			}
		}
	}
`;
