import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import FlexibleContent from '../components/flexibleContent';
import Seo from '../components/seo';
import Page from '../components/page';
import PostList from '../components/postList';
import BlogSidebar from '../components/blogSidebar';
import CSS from '../css/modules/blog.module.scss';

export default class BlogTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	render() {
		const {currentPage, categories, tags, posts} = this.props.data;

		return (
			<Page contain={false}>
				<Seo
					currentPage={currentPage}
					site={this.props.site}
					location={this.props.location}
				/>
				<FlexibleContent page={currentPage}/>
				<div className="container">
					<div className={CSS.blog}>
						<div className={CSS.blogWrap}>
							<div className={CSS.blogList}>
								<PostList posts={posts.edges}/>
							</div>
							<div className={CSS.blogSidebar}>
								<BlogSidebar categories={categories.edges} tags={tags.edges}/>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}

import {LargeImage} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const BlogFragment = graphql`
	fragment BlogFragment on RootQueryType {
		tags: allWordpressTag(filter: {count: {gt: 0}}) {
			edges {
				node {
					id: wordpress_id
					name
					link
				}
			}
		}
		categories: allWordpressCategory(filter: {count: {gt: 0}}) {
			edges {
				node {
					id: wordpress_id
					name
					link
				}
			}
		}
	}
`;

export const blogQuery = graphql`
	query blogQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
		...BlogFragment
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
	}
`;
