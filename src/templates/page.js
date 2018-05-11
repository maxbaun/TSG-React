import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Hero from '../components/hero';
import Section from '../components/section';
import {innerHtml} from '../utils/wordpressHelpers';

export default class PageTemplate extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	}

	render() {
		const {currentPage, site} = this.props.data;

		return (
			<div>
				<Hero
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					content={currentPage.acf.heroContent}
					link={currentPage.acf.heroLink}
				/>
				<Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="rightToLeft"
					backgroundColor="coral"
				>
					<div style={{
						maxWidth: 600,
						margin: '50px auto'
					}}>
						<h1>this is a test</h1>
						<h3>this is another test</h3>
						<div>content</div>
						<h1>this is a test</h1>
						<h3>this is another test</h3>
						<div>content</div>
						<h1>this is a test</h1>
						<h3>this is another test</h3>
						<div>content</div>
						<h1>this is a test</h1>
						<h3>this is another test</h3>
						<div>content</div>

					</div>
				</Section>
				<Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="leftToRight"
					backgroundColor="lightblue"
				>
					<h1>this is a test</h1>
					<h3>this is another test</h3>
					<div>content</div>
					<h1>this is a test</h1>
					<h3>this is another test</h3>
					<div>content</div>
					<h1>this is a test</h1>
					<h3>this is another test</h3>
					<div>content</div>
					<h1>this is a test</h1>
					<h3>this is another test</h3>
					<div>content</div>
				</Section>
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
