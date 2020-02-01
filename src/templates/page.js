import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import SectionAvailability from '../components/sectionAvailability';
import FlexibleContent from '../components/flexibleContent';
import Seo from '../components/seo';

import {Page} from '../utils/fragments'; // eslint-disable-line no-unused-vars
import DefaultLayout from '../components/layout';

export default class PageTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object
	};

	render() {
		const {currentPage} = this.props.data;

		return (
			<DefaultLayout>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<FlexibleContent page={currentPage}/>
				{currentPage.acf.hasCallToAction ? <SectionAvailability/> : null}
			</DefaultLayout>
		);
	}
}


export const pageQuery = graphql`
	query defaultPageQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
	}
`;
