import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Seo from '../components/seo';
import Page from '../components/page';
import Archive from '../components/archive';

export default class CategoryTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	render() {
		const {posts, category, categories, tags} = this.props.data;

		return (
			<Page contain={false}>
				<Seo
					currentPage={{
						title: category.name
					}}
					site={this.props.site}
					location={this.props.location}
				/>
				<Archive
					titlePrefix="Category"
					title={category.name}
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

export const categoryQuery = graphql`
	query categoryQuery($name: String!) {
		...BlogFragment
		category: wordpressCategory(name: {eq: $name}) {
			name
			link
		}
		posts: allWordpressPost(filter: {categories: {name: {eq: $name}}}) {
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
