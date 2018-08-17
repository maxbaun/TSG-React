import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import FlexibleContent from '../components/flexibleContent';
import Page from '../components/page';
import Seo from '../components/seo';
import SocialIcons from '../components/socialIcons';
import CSS from '../css/modules/contact.module.scss';
import {emailLink, phoneLink} from '../utils/componentHelpers';
import {innerHtml} from '../utils/wordpressHelpers';

export default class ContactTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired,
		options: PropTypes.object.isRequired
	};

	render() {
		const {currentPage} = this.props.data;

		return (
			<Page contain padding={false}>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<div className={CSS.wrap}>
					<div className={CSS.content}>
						<FlexibleContent page={currentPage} formContain={false}/>
					</div>
					<div className={CSS.sidebar}>
						<div className={CSS.sidebarBlock}>
							<h3>Connect</h3>
							<div className={CSS.socialIcons}>
								<SocialIcons
									facebook={this.props.options.social.facebook}
									pinterest={this.props.options.social.pinterest}
									instagram={this.props.options.social.instagram}
									vimeo={this.props.options.social.vimeo}
									youtube={this.props.options.social.youtube}
								/>
							</div>
						</div>
						<div className={CSS.sidebarBlock}>
							<h3>Find Us</h3>
							<p>{this.props.options.findUsMessage}</p>
							<ul className={CSS.find}>
								<li>
									<span className="fa fa-phone"/>
									<a href={phoneLink(this.props.options.phone)}>{this.props.options.phone}</a>
								</li>
								<li>
									<span className="fa fa-fax"/>
									<a href={emailLink(this.props.options.email)}>{this.props.options.fax}</a>
								</li>
								<li>
									<span className="fa fa-envelope"/>
									<a href={emailLink(this.props.options.email)}>{this.props.options.email}</a>
								</li>
								<li>
									<span className="fa fa-map-marker-o"/>
									{/* eslint-disable-next-line react/no-danger */}
									<span dangerouslySetInnerHTML={innerHtml(this.props.options.address)}/>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}

import {Page as pageFragment} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const contactQuery = graphql`
	query contactQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
	}
`;
