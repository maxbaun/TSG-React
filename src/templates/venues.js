import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import FlexibleContent from '../components/flexibleContent';
import Image from '../components/image';
import Link from '../components/link';
import Seo from '../components/seo';
import CSS from '../css/modules/venues.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

export default class PageTemplate extends React.Component {
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
		const {currentPage} = this.props.data;
		const venues = this.transformVenues();

		return (
			<div>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<FlexibleContent page={currentPage}/>
				<div className={CSS.venues}>
					<ul>
						{venues.map(venue => {
							return (
								<li key={venue.id}>
									<Link to={`/venue/${venue.slug}`} classname={CSS.venue}>
										<div className={CSS.venueImage}>
											<Image image={venue.image} style={{height: '100%'}}/>
										</div>
										<div className={CSS.venueTitle}>
											{/* eslint-disable-next-line react/no-danger */}
											<h3 dangerouslySetInnerHTML={innerHtml(venue.title)}/>
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

import {Page, Venue} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const pageQuery = graphql`
	query venueTemplateQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
		venues: allWordpressWpVenue {
			edges {
				node {
					...Venue
				}
			}
		}
	}
`;
