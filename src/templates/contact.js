import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

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
		site: PropTypes.object
	};

	render() {
		const {currentPage, options: {options}} = this.props.data;

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
									facebook={options.social.facebook}
									pinterest={options.social.pinterest}
									instagram={options.social.instagram}
									vimeo={options.social.vimeo}
									youtube={options.social.youtube}
								/>
							</div>
						</div>
						<div className={CSS.sidebarBlock}>
							<h3>Find Us</h3>
							<p>{options.findUsMessage}</p>
							<ul className={CSS.find}>
								<li>
									<span className="fa fa-phone"/>
									<a href={phoneLink(options.phone)}>{options.phone}</a>
								</li>
								<li>
									<span className="fa fa-fax"/>
									<a href={emailLink(options.email)}>{options.fax}</a>
								</li>
								<li>
									<span className="fa fa-envelope"/>
									<a href={emailLink(options.email)}>{options.email}</a>
								</li>
								<li>
									<span className="fa fa-map-marker-alt"/>
									{/* eslint-disable-next-line react/no-danger */}
									<span dangerouslySetInnerHTML={innerHtml(options.address)}/>
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
		options: wordpressAcfOptions {
			options {
				phone: contactPhoneNumber
				email: contactEmail
				fax: contactFax
				address: contactAddress
				findUsMessage: contactFindUsMessage
				social: contactSocial {
					facebook
					pinterest
					instagram
					vimeo
					youtube
				}
			}
		}
	}
`;
