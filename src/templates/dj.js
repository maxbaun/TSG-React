import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';

import DJThumbnail from '../components/djThumbnail';
import HeroComp from '../components/hero';
import Image from '../components/image';
import Link from '../components/link';
import SectionContent from '../components/sectionContent';
import Page from '../components/page';
import Seo from '../components/seo';
import {djLink} from '../utils/linkHelpers';
import {bioPosition, bioName, innerHtml} from '../utils/wordpressHelpers';
import CSS from '../css/modules/dj.module.scss';

export default class DJTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.renderOtherDJs = this.renderOtherDJs.bind(this);
	}
	static propTypes = {
		data: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		site: PropTypes.object
	};

	renderOtherDJs() {
		const {djs} = this.props.data;
		const otherDjs = djs.edges ? djs.edges.map(dj => dj.node) : [];

		return (
			<div className={CSS.other}>
				<SectionContent
					classname="otherDjs"
					content={{
						header: `<h2>Our Boston Wedding DJs</h2>`
					}}
				/>
				<ul>
					{otherDjs.map(dj => {
						return (
							<li key={dj.title}>
								<div className={CSS.otherDJ}>
									<Link to={djLink(dj.slug)}>
										<div className={CSS.otherDJImage}>
											<Image image={dj.image} size="medium"/>
										</div>
										<div className={CSS.otherDJOverlay}>
											<h5
												// eslint-disable-next-line react/no-danger
												dangerouslySetInnerHTML={innerHtml(bioName(dj.title))}
											/>
										</div>
									</Link>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	render() {
		const {currentPage, djs} = this.props.data;

		const otherDjs = djs.edges ? djs.edges.map(dj => dj.node) : [];
		const {children = []} = currentPage;
		const [hero] = children.filter(c => c.type === 'WordPressAcf_hero');
		const heroSet = Boolean(hero);

		const seoEl = (<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>);

		const contentEl = (
			<div className={CSS.wrap}>
				<div className={CSS.dj}>
					<div className={CSS.image}>
						<DJThumbnail image={currentPage.image}/>
					</div>
					<h1
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={innerHtml(bioName(currentPage.title))}
					/>
					<h3>{bioPosition(currentPage.title)}</h3>
					<div
						// eslint-disable-next-line react/no-danger
						dangerouslySetInnerHTML={innerHtml(currentPage.content)}
						className={CSS.content}
					/>
				</div>
				{this.renderOtherDJs()}
			</div>
		);

		if (hero) {
			return (
				<Page style={{paddingTop: 0}}>
					{seoEl}
					<HeroComp
						// eslint-disable-next-line react/no-array-index-key
						title={hero.title}
						subtitle={hero.subtitle}
						link={hero.link}
						images={hero.images || []}
						video={hero.video ? hero.video[0] : null}
						className="heroDj"
					/>
					<div className={CSS.wrap} style={{paddingTop: 60}}>
						<div className={CSS.dj} style={{maxWidth: 1200}}>
							<div className="container">
								<div className="row">
									<div className="col-md-4">
										<div className={CSS.image} style={{maxWidth: '100%'}}>
											<DJThumbnail hasBg={false} image={currentPage.image} height={150} width={150}/>
										</div>
										<h1
											// eslint-disable-next-line react/no-danger
											dangerouslySetInnerHTML={innerHtml(bioName(currentPage.title))}
										/>
										<h3>{bioPosition(currentPage.title)}</h3>
									</div>
									<div className="col-md-8">
										<div
											// eslint-disable-next-line react/no-danger
											dangerouslySetInnerHTML={innerHtml(currentPage.content)}
											className={CSS.content}
										/>
									</div>
								</div>
							</div>
						</div>
						{this.renderOtherDJs()}
					</div>


				</Page>
			)
		}

		return (
			<Page contain>
				{seoEl}
				{contentEl}
			</Page>
		);
	}
}

import {DJ, Hero} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const pageQuery = graphql`
	query djTemplateQuery($id: String!) {
		currentPage: wordpressWpDj(id: {eq: $id}) {
			...DJ
			children {
				type: __typename
				... on WordPressAcf_hero {
					...Hero
				}
			}
		}
		djs: allWordpressWpDj(filter: {id: {ne: $id}, slug: {ne: "do-not-delete"}}) {
			edges {
				node {
					...DJ
				}
			}
		}
	}
`;
