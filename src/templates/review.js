import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Page from '../components/page';
import SectionContent from '../components/sectionContent';
import Image from '../components/image';
import Button from '../components/button';
import Seo from '../components/seo';
import CSS from '../css/modules/review.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';

export default class ReviewTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired
	};

	render() {
		const {currentPage, options} = this.props.data;

		let ratingArr = [];

		for (let index = 0; index < parseInt(currentPage.acf.rating, 10); index++) {
			ratingArr.push({id: index});
		}

		return (
			<Page contain>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<div className={CSS.wrap}>
					<SectionContent
						classname="review"
						content={{
							header: `<h1>${currentPage.title}</h1>`
						}}
					/>
					<div className={CSS.review}>
						<div className={CSS.reviewHeader}>
							<div className={CSS.reviewImage}>
								<Image circle showPlaceholder image={currentPage.image}/>
							</div>
							<div className={CSS.reviewDetails}>
								<ul>
									<li>
										<h3>Rating</h3>
										<div className={CSS.rating}>
											{ratingArr.map(r => {
												return <span key={r.id}/>;
											})}
										</div>
									</li>
									<li>
										<h3>Location</h3>
										{currentPage.acf.location}
									</li>
									<li>
										<h3>Date</h3>
										<span>{currentPage.acf.date}</span>
									</li>
									<li>
										<h3>Services</h3>
										<span>{currentPage.acf.services}</span>
									</li>
								</ul>
							</div>
						</div>
						{/* eslint-disable-next-line react/no-danger */}
						<div className={CSS.reviewBody} dangerouslySetInnerHTML={innerHtml(currentPage.content)}/>
					</div>
					<div className={CSS.cta}>
						<Button to={options.allReviewsLink}>See All Reviews!</Button>
					</div>
				</div>
			</Page>
		);
	}
}

import {Review} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const pageQuery = graphql`
	query reviewTemplateQuery($id: String!) {
		currentPage: wordpressWpReview(id: {eq: $id}) {
			...Review
		}
		options: wordpressAcfOptions {
			allReviewsLink
		}
	}
`;
