import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Seo from '../components/seo';
import Page from '../components/page';
import Archive from '../components/archive';

export default class TagTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	render() {
		const {posts, tag, categories, tags} = this.props.data;

		return (
			<Page contain={false}>
				<Seo
					currentPage={{
						title: tag.name
					}}
					site={this.props.site}
					location={this.props.location}
				/>
				<Archive
					titlePrefix="Tag"
					title={tag.name}
					posts={posts.edges}
					categories={categories.edges}
					tags={tags.edges}
				/>
			</Page>
		);
	}
}

import {LargeImage} from '../utils/fragments'; // eslint-disable-line no-unused-vars
import {BlogFragment} from './blog'; // eslint-disable-line no-unused-vars

export const tagQuery = graphql`
	query tagQuery($name: String!) {
		...BlogFragment
		tag: wordpressTag(name: {eq: $name}) {
			name
			link
		}
		posts: allWordpressPost(filter: {tags: {name: {eq: $name}}}) {
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
	}
`;
