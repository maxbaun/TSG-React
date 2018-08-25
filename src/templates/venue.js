import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import axios from 'axios';

import CSS from '../css/modules/venue.module.scss';
import Page from '../components/page';
import SectionContent from '../components/sectionContent';
import Gallery from '../components/gallery';
import Seo from '../components/seo';
import Button from '../components/button';

export default class VenueTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	componentDidMount() {
		this.getImages();
	}

	getImages() {
		this.setState({
			loading: true
		});

		axios
			.get(`${API_URL}/tsg/v1/venue`, {
				params: {
					slug: this.props.data.venue.slug
				}
			})
			.then(res => res.data)
			.then(res => {
				this.setState({
					loading: false,
					images: res.data.gallery
				});
			});
	}

	render() {
		const {venue, options} = this.props.data;

		return (
			<Page contain>
				<Seo currentPage={{...venue, image: venue.image.url}} site={this.props.site} location={this.props.location}/>
				<SectionContent classname="venueTemplate" content={{header: `<h1>${venue.title}</h1><h3>${venue.location}</h3>`}}/>
				<Gallery loading={this.state.loading} images={this.state.images || []}/>
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
		venue: wordpressTsgVenues(id: {eq: $id}) {
			...Venue
		}
		options: wordpressAcfOptions {
			allVenuesLink {
				title
				url
			}
		}
	}
`;
