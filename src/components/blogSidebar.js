import React from 'react';
import PropTypes from 'prop-types';

import Link from './link';
import CSS from '../css/modules/blogSidebar.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

const BlogSidebar = ({tags, categories}) => {
	return (
		<div className={CSS.sidebar}>
			<div className={CSS.sidebarList}>
				<h3>Categories</h3>
				<ul>
					{categories.map(c => {
						const {node: category} = c;

						return (
							<li key={category.wordpress_id}>
								<Link to={category.link}>
									<span
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={innerHtml(category.name)}
									/>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className={CSS.sidebarListTags}>
				<h3>Tags</h3>
				<ul>
					{tags.map(t => {
						const {node: tag} = t;

						return (
							<li key={tag.wordpress_id}>
								<Link to={tag.link}>
									<span
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={innerHtml(tag.name)}
									/>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

BlogSidebar.propTypes = {
	tags: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired
};

export default BlogSidebar;
