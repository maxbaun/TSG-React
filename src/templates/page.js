import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Hero from '../components/hero';
import {innerHtml} from '../utils/wordpressHelpers';

export default class PageTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	render() {
		const {currentPage, site} = this.props.data;
		console.log(currentPage);

		return (
			<div>
				<Hero/>
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={innerHtml(currentPage.content)} // eslint-disable-line react/no-danger
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export const pageQuery = graphql`
query defaultPageQuery($id: String!) {
  currentPage: wordpressPage(id: {eq: $id}) {
	...Page
  }
  site {
	...Site
  }
}
`;
