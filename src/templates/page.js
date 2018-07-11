import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import Hero from '../components/hero';
import PageDescription from '../components/pageDescription';
import Section from '../components/sectionSlant';
import SectionHalf from '../components/sectionHalf';
import SectionReviews from '../components/sectionReviews';
import SectionBios from '../components/sectionBios';
import SectionCta from '../components/sectionCta';
import SectionSlant from '../components/sectionSlant';
import SectionFacts from '../components/sectionFacts';
import SectionFeatured from '../components/sectionFeatured';
import SectionAwards from '../components/sectionAwards';
import SectionServices from '../components/sectionServices';
import {innerHtml} from '../utils/wordpressHelpers';

const SectionMap = {
	hero: Hero
};

export default class PageTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			windowWidth: 0
		};

		this.getSectionComponent = this.getSectionComponent.bind(this);
		this.handleWindowResize = this.handleWindowResize.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	handleWindowResize() {
		this.setState({
			windowWidth: window.innerWidth
		});
	}

	getSectionComponent(section) {
		let sectionKey = null;

		for (let key in SectionMap) {
			if (section[key]) {
				sectionKey = key;
			}
		}

		return React.createElement(SectionMap[sectionKey], section[sectionKey]);
	}

	render() {
		const {windowWidth} = this.state;
		const {currentPage, site} = this.props.data;

		const children = currentPage.children.filter(c => {
			return (
				c.type === 'WordPressAcf_hero' ||
				c.type === 'WordPressAcf_pageDescriptionContent' ||
				c.type === 'WordPressAcf_pageDescriptionImages' ||
				c.type === 'WordPressAcf_sectionHalf' ||
				c.type === 'WordPressAcf_sectionReviews' ||
				c.type === 'WordPressAcf_sectionBios' ||
				c.type === 'WordPressAcf_sectionAwards' ||
				c.type === 'WordPressAcf_sectionSlant' ||
				c.type === 'WordPressAcf_sectionFacts' ||
				c.type === 'WordPressAcf_sectionFeatured' ||
				c.type === 'WordPressAcf_sectionServices'
			);
		});

		return (
			<div>
				{children.map((child, index) => {
					if (child.type === 'WordPressAcf_hero') {
						return (
							<Hero
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								title={child.title}
								subtitle={child.subtitle}
								link={child.link}
								images={child.images}
								video={child.video ? child.video[0] : null}
							/>
						);
					}

					if (child.type === 'WordPressAcf_pageDescriptionContent') {
						return (
							<PageDescription
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								zIndex={0}
								view="content"
								content={child.sectionContent[0]}
								angleBottom={!child.disableAngleBottom}
							/>
						);
					}

					if (child.type === 'WordPressAcf_pageDescriptionImages') {
						console.log(child);

						return (
							<PageDescription
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								zIndex={0}
								view="images"
								images={child.images}
								angleBottom={!child.disableAngleBottom}
							/>
						);
					}

					if (child.type === 'WordPressAcf_sectionHalf') {
						// Const prevChild = children[index - 1];
						// let sectionHalfStyle = {};

						// if (prevChild && prevChild.type === 'WordPressAcf_pageDescriptionImages') {
						// 	sectionHalfStyle = {
						// 		marginTop: windowWidth > 768 ? -100 : 0
						// 	};

						// 	if (windowWidth > 768) {
						// 		sectionHalfStyle.paddingTop = 0;
						// 	}
						// }
						// eslint-disable-next-line react/no-array-index-key
						return <SectionHalf key={index} zIndex={index} left={child.left[0]} right={child.right[0]}/>;
					}

					if (child.type === 'WordPressAcf_sectionReviews') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionReviews key={index} header={child.header} content={child.content} reviews={child.reviews} link={child.link}/>;
					}

					if (child.type === 'WordPressAcf_sectionBios') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionBios key={index} header={child.header} content={child.content} bios={child.bios}/>;
					}

					if (child.type === 'WordPressAcf_sectionSlant') {
						return (
							<SectionSlant
								// eslint-disable-next-line react/no-array-index-key
								key={index}
								id={`sectionSlant${index}`}
								slantDirection={child.slantDirection}
								image={child.image}
								content={child.sectionContent[0]}
								slantTop={!child.disableSlantTop}
								slantBottom={!child.disableSlantBottom}
							/>
						);
					}

					if (child.type === 'WordPressAcf_sectionFacts') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionFacts key={index} title={child.title} facts={child.facts} link={child.link}/>;
					}

					if (child.type === 'WordPressAcf_sectionFeatured') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionFeatured key={index} image={child.image} content={child.sectionContent[0]}/>;
					}

					if (child.type === 'WordPressAcf_sectionAwards') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionAwards key={index} title={child.title} images={child.images}/>;
					}

					if (child.type === 'WordPressAcf_sectionServices') {
						// eslint-disable-next-line react/no-array-index-key
						return <SectionServices key={index} content={child.sectionContent[0]} services={child.services}/>;
					}

					return null;
				})}
				{currentPage.acf.hasCallToAction ? <SectionCta/> : null}
				{/* <Section
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
				</Section> */}
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
