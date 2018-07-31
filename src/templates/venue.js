import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import CSS from '../css/modules/venue.module.scss';
import Page from '../components/page';
import SectionContent from '../components/sectionContent';
import Gallery from '../components/gallery';
import Button from '../components/button';

export default class VenueTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	render() {
		const {venue, site, options} = this.props.data;

		return (
			<Page contain>
				<SectionContent classname="venueTemplate" content={{header: `<h1>${venue.title}</h1><h3>${venue.acf.location}</h3>`}}/>
				<Gallery images={venue.acf.gallery}/>
				<div className={CSS.cta}>
					<Button to={options.allVenuesLink.url}>{options.allVenuesLink.title}</Button>
				</div>
			</Page>
		);
	}
}

import {Venue} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const venueQuery = graphql`
	query venueQuery($id: String!) {
		venue: wordpressWpVenue(id: {eq: $id}) {
			...Venue
		}
		site {
			...Site
		}
		options: wordpressAcfOptions {
			allVenuesLink {
				title
				url
			}
		}
	}
`;
