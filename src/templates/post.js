import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import {innerHtml} from '../utils/wordpressHelpers';
import Image from '../components/image';
import Seo from '../components/seo';
import Page from '../components/page';
import CSS from '../css/modules/post.module.scss';

export default class PostTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			heroActive: false
		};

		this.handleImageLoad = this.handleImageLoad.bind(this);
	}

	static propTypes = {
		location: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	handleImageLoad() {
		this.setState({heroActive: true});
	}

	render() {
		const {currentPost: post} = this.props.data;

		const heroCss = [CSS.hero];

		if (this.state.heroActive) {
			heroCss.push(CSS.heroActive);
		}

		const title = <h1 dangerouslySetInnerHTML={innerHtml(post.title)}/>; // eslint-disable-line react/no-danger

		return (
			<Page padding={false}>
				<Seo currentPage={post} site={this.props.site} location={this.props.location}/>

				{post.image ? (
					<div className={heroCss.join(' ')}>
						<div className={CSS.heroImage}>
							<Image
								placeholder
								image={post.image}
								onLoad={this.handleImageLoad}
								style={{height: '100%'}}
								imgStyle={{height: '100%'}}
							/>
						</div>
						<div className={CSS.heroContent}>{title}</div>
					</div>
				) : (
					<div className={CSS.header}>{title}</div>
				)}
				<div className={CSS.post}>
					{/* eslint-disable-next-line react/no-danger */}
					<div dangerouslySetInnerHTML={innerHtml(post.content)}/>
				</div>
			</Page>
		);
	}
}

import {Post} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const postQuery = graphql`
	query defaultPostQuery($id: String!) {
		currentPost: wordpressPost(id: {eq: $id}) {
			...Post
		}
	}
`;
