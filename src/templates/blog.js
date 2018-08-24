import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import FlexibleContent from '../components/flexibleContent';
import Image from '../components/image';
import Link from '../components/link';
import Seo from '../components/seo';
import CSS from '../css/modules/venues.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

export default class BlogTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	transformVenues() {
		const {venues: venueData} = this.props.data;

		if (!venueData || !venueData.edges) {
			return [];
		}

		// Pull out the nodes
		const venueNodes = venueData.edges.map(v => v.node);

		// Sort the venues alphabetically
		const sortedVenues = venueNodes.sort((a, b) => {
			const aTitle = a.title.toLowerCase();
			const bTitle = b.title.toLowerCase();

			if (aTitle < bTitle) {
				return -1;
			}

			if (aTitle > bTitle) {
				return 1;
			}

			return 0;
		});

		return sortedVenues;
	}

	render() {
		const {currentPage, posts, categories, tags} = this.props.data;

		return (
			<div>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<FlexibleContent page={currentPage}/>
				<div className={CSS.venues}>
					<ul>
						{posts.edges.map(p => {
							const {node: post} = p;
							return (
								<li key={post.id}>
									<Link to={`/${post.slug}`} classname={CSS.venue}>
										<div className={CSS.venueImage}>
											{post.image ? <Image image={post.image} style={{height: '100%'}}/> : null}
										</div>
										<div className={CSS.venueTitle}>
											{/* eslint-disable-next-line react/no-danger */}
											<h3 dangerouslySetInnerHTML={innerHtml(post.title)}/>
										</div>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

import {Page, LargeImage} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const blogQuery = graphql`
	query blogQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
		posts: allWordpressPost {
			edges {
				node {
					id: wordpress_id
					slug
					title
					link
					excerpt
					image: featured_media {
						...LargeImage
					}
				}
			}
		}
		tags: allWordpressTag {
			edges {
				node {
					name
					link
				}
			}
		}
		categories: allWordpressCategory {
			edges {
				node {
					name
					link
				}
			}
		}
	}
`;
