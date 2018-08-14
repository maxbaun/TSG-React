import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import {innerHtml} from '../utils/wordpressHelpers';
import Hero from '../components/hero';
import Seo from '../components/seo';
import SectionContent from '../components/sectionContent';
import CSS from '../css/modules/post.module.scss';

export default class PostTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			});
		}, 150);
	}

	render() {
		const {active} = this.state;
		const {currentPost} = this.props.data;

		const bodyCss = [CSS.body];

		if (active) {
			bodyCss.push(CSS.bodyActive);
		}

		return (
			<div>
				<Seo currentPage={currentPost} site={this.props.site} location={this.props.location}/>
				<div className={CSS.wrap}>
					{currentPost.image && currentPost.image.url ? <Hero images={[currentPost.image]}/> : null}
					<div className={bodyCss.join(' ')}>
						<SectionContent
							content={{
								header: `<h1>${currentPost.title}</h1>`
							}}
							contentContainerWidth={950}
							classname="postHeader"
						/>
						{/* <Image image={currentPost.image}/> */}
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={innerHtml(currentPost.content)} className={CSS.content}/>
					</div>
				</div>
			</div>
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
