import React, {Component} from 'react';
import graphql from 'graphql';

import DefaultTemplate from '../templates/page';

export default class Index extends Component {
	render() {
		console.log(this.props);

		return <DefaultTemplate {...this.props}/>;
	}
}

// eslint-disable-next-line no-unused-vars
import {Page, Site} from '../utils/fragments';

export const pageQuery = graphql`
	query homePageQuery {
		currentPage: wordpressPage(title: {eq: "Home"}) {
			...Page
		}
		site {
			...Site
		}
	}
`;
