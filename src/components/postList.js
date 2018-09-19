import React from 'react';
import PropTypes from 'prop-types';
import InfinitScroll from 'react-infinite-scroller';

import Image from '../components/image';
import Link from '../components/link';
import Button from '../components/button';
import CSS from '../css/modules/blog.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

const PerPage = 10;

export default class BlogTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: PerPage
		};

		this.handleLoadMore = this.handleLoadMore.bind(this);
		this.getVisiblePosts = this.getVisiblePosts.bind(this);
	}

	static propTypes = {
		posts: PropTypes.array.isRequired
	};

	hasMore() {
		return this.state.visible < this.props.posts.length;
	}

	handleLoadMore() {
		if (!this.hasMore()) {
			return;
		}

		this.setState(prevState => {
			return {
				...prevState,
				visible: prevState.visible + PerPage
			};
		});
	}

	getVisiblePosts() {
		return this.props.posts.filter(n => n.node.slug !== 'do-not-delete').slice(0, this.state.visible);
	}

	render() {
		const posts = this.getVisiblePosts();

		return (
			<InfinitScroll initialLoad={false} pageStart={0} loadMore={this.handleLoadMore} hasMore={this.hasMore()}>
				<ul className={CSS.postList}>
					{posts.map(p => {
						const {node: post} = p;
						return (
							<li key={post.id}>
								<Link to={`/blog/${post.slug}`} classname={CSS.post}>
									<div className={CSS.postImage}>
										{post.image ? (
											<Image image={post.image} style={{height: '100%'}} size="medium_large"/>
										) : (
											<div className={CSS.postImagePlaceholder}/>
										)}
										<div className={CSS.postOverlay}>
											<h3
												className={CSS.postTitle}
												// eslint-disable-next-line react/no-danger
												dangerouslySetInnerHTML={innerHtml(post.title)}
											/>
										</div>
									</div>
									<div
										className={CSS.postContent}
										// eslint-disable-next-line react/no-danger
										dangerouslySetInnerHTML={innerHtml(post.excerpt)}
									/>
									<Button size="sm">Read More</Button>
								</Link>
							</li>
						);
					})}
				</ul>
			</InfinitScroll>
		);
	}
}
