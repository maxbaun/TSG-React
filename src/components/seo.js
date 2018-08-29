import React from 'react';
import PropTypes from 'prop-types';

import Head from './head';
import {htmlToString} from '../utils/componentHelpers';
import {replaceLinks} from '../utils/wordpressHelpers';

const Seo = ({currentPage, location, site}) => {
	const isHome = currentPage.link && currentPage.link.includes('/home');
	return (
		<Head
			{...currentPage.yoast}
			site={site}
			location={location}
			defaultTitle={`${htmlToString(currentPage.title)}`}
			image={currentPage.image ? currentPage.image.url : null}
			ogImage={
				currentPage.yoast && currentPage.yoast.ogImage ?
					currentPage.yoast.ogImage.url :
					null
			}
			twitterImage={
				currentPage.yoast && currentPage.yoast.twitterImage ?
					currentPage.yoast.twitterImage.url :
					null
			}
			excerpt={currentPage.excerpt}
			pageUrl={
				isHome ?
					site.siteMeta.siteUrl :
					replaceLinks(currentPage.link, site.siteMeta.siteUrl)
			}
		/>
	);
};

Seo.propTypes = {
	currentPage: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	site: PropTypes.object.isRequired
};

export default Seo;
