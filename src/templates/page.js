import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Hero from '../components/hero';
import PageDescription from '../components/pageDescription';
import Section from '../components/sectionHalfImage';
import {innerHtml} from '../utils/wordpressHelpers';

const SectionMap = {
	hero: Hero
};

export default class PageTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.getSectionComponent = this.getSectionComponent.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	getSectionComponent(section) {
		let sectionKey = null;

		for (let key in SectionMap) {
			if (section[key]) {
				sectionKey = key;
			}
		}

		console.log(section);

		return React.createElement(SectionMap[sectionKey], section[sectionKey]);
	}

	render() {
		const {currentPage, site} = this.props.data;

		return (
			<div>
				{currentPage.children.map((child, index) => {
					if (child.type === 'WordPressAcf_hero') {
						// eslint-disable-next-line react/no-array-index-key
						return <Hero key={index} {...child.hero[0]}/>;
					}

					if (child.type === 'WordPressAcf_pageDescriptionContent') {
						// eslint-disable-next-line react/no-array-index-key
						return <PageDescription key={index} {...child.content[0]}/>;
					}

					return null;
				})}
				<Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="leftToRight"
					backgroundColor="coral"
				>
					<div
						style={{
							maxWidth: 600,
							margin: '50px auto'
						}}
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
					</div>
				</Section>
				<Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="rightToLeft"
					backgroundColor="lightblue"
				>
					<div
						style={{
							maxWidth: 600,
							margin: '50px auto'
						}}
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
					</div>
				</Section>
				{/* <Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="rightToLeft"
					backgroundColor="coral"
				>
					<div
						style={{
							maxWidth: 600,
							margin: '50px auto'
						}}
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
					</div>
				</Section>
				<Section
					image={currentPage.image ? currentPage.image.localFile.childImageSharp.hero : {}}
					slantDirection="leftToRight"
					backgroundColor="lightblue"
				>
					<div
						style={{
							maxWidth: 600,
							margin: '50px auto'
						}}
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
					</div>
				</Section>
				<div className="container">
					<div className="page-content">
						<div className="bg-black">
							<div
								dangerouslySetInnerHTML={innerHtml(currentPage.content)} // eslint-disable-line react/no-danger
							/>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}

import {Page} from '../utils/fragments'; // eslint-disable-line no-unused-vars

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
