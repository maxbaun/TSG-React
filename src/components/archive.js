import React from 'react';
import PropTypes from 'prop-types';

import BlogSidebar from './blogSidebar';
import PostList from './postList';
import Link from './link';
import CSS from '../css/modules/archive.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

const Archive = ({posts, title, tags, categories, titlePrefix}) => {
	return (
		<div className={CSS.archive}>
			<div className="container">
				<div className={CSS.inner}>
					<div className={CSS.header}>
						<h1>
							{titlePrefix}: {/* eslint-disable-next-line react/no-danger */}
							<strong dangerouslySetInnerHTML={innerHtml(title)}/>
						</h1>
					</div>
					<div className={CSS.blogWrap}>
						<div className={CSS.blogList}>
							<PostList posts={posts}/>
						</div>
						<div className={CSS.blogSidebar}>
							<Link to="/blog">
								<h3>All Posts</h3>
							</Link>
							<BlogSidebar tags={tags} categories={categories}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Archive.propTypes = {
	posts: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	tags: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	titlePrefix: PropTypes.string
};

Archive.defaultProps = {
	titlePrefix: 'Category'
};

export default Archive;
