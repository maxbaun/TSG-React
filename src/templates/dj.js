import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import DJThumbnail from '../components/djThumbnail';
import Image from '../components/image';
import Link from '../components/link';
import SectionContent from '../components/sectionContent';
import Page from '../components/page';
import Seo from '../components/seo';
import {djLink} from '../utils/linkHelpers';
import {bioPosition, bioName, innerHtml} from '../utils/wordpressHelpers';
import CSS from '../css/modules/dj.module.scss';

export default class DJTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	render() {
		const {currentPage, djs} = this.props.data;

		const otherDjs = djs.edges ? djs.edges.map(dj => dj.node) : [];

		return (
			<Page contain>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<div className={CSS.wrap}>
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
						<SectionContent
							classname="otherDjs"
							content={{
								header: `<h2>Our Boston Wedding DJs</h2>`
							}}
						/>
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
			</Page>
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
