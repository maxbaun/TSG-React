import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Hero from './hero';
import PageDescription from './pageDescription';
import SectionHalf from './sectionHalf';
import SectionReviews from './sectionReviews';
import SectionBios from './sectionBios';
import SectionSlant from './sectionSlant';
import SectionFacts from './sectionFacts';
import SectionFeatured from './sectionFeatured';
import SectionAwards from './sectionAwards';
import SectionServices from './sectionServices';
import FullWidthImage from './fullWidthImage';
import SectionComponents from './sectionComponents';
import SectionPlanning from './sectionPlanning';
import FullWidthContent from './fullWidthContent';
import SectionForm from './sectionForm';

const FlexibleContent = ({page, formContain}) => {
	const children = page.children.filter(c => {
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
			c.type === 'WordPressAcf_sectionServices' ||
			c.type === 'WordPressAcf_fullWidthImage' ||
			c.type === 'WordPressAcf_sectionComponents' ||
			c.type === 'WordPressAcf_sectionPlanning' ||
			c.type === 'WordPressAcf_fullWidthContent' ||
			c.type === 'WordPressAcf_sectionForm'
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
							video={child.video ? child.video[0] : null}
						/>
					);
				}

				if (child.type === 'WordPressAcf_pageDescriptionImages') {
					return (
						<PageDescription
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							zIndex={0}
							view="images"
							images={child.images}
							angleBottom={!child.disableAngleBottom}
							video={child.video ? child.video[0] : null}
						/>
					);
				}

				if (child.type === 'WordPressAcf_sectionHalf') {
					return (
						<SectionHalf
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							zIndex={index}
							verticalCenter={child.verticalCenter}
							left={child.left[0]}
							right={child.right[0]}
						/>
					);
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

				if (child.type === 'WordPressAcf_fullWidthImage') {
					// eslint-disable-next-line react/no-array-index-key
					return <FullWidthImage key={index} {...child}/>;
				}

				if (child.type === 'WordPressAcf_sectionComponents') {
					// eslint-disable-next-line react/no-array-index-key
					return <SectionComponents key={index} header={child.header} components={child.components}/>;
				}

				if (child.type === 'WordPressAcf_sectionPlanning') {
					// eslint-disable-next-line react/no-array-index-key
					return <SectionPlanning key={index} {...child} header={child.sectionHeader[0]}/>;
				}

				if (child.type === 'WordPressAcf_fullWidthContent') {
					// eslint-disable-next-line react/no-array-index-key
					return <FullWidthContent key={index} {...child} content={child.sectionContent[0]} maxWidth={parseInt(child.maxWidth, 10)}/>;
				}

				if (child.type === 'WordPressAcf_sectionForm') {
					// eslint-disable-next-line react/no-array-index-key
					return <SectionForm key={index} {...child} content={child.sectionContent[0]} form={child.form} contain={formContain}/>;
				}

				return null;
			})}
		</div>
	);
};

FlexibleContent.propTypes = {
	page: PropTypes.object.isRequired,
	formContain: PropTypes.bool
};

FlexibleContent.defaultProps = {
	formContain: true
};

export default FlexibleContent;
