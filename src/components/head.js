import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {stripHtml} from '../utils/componentHelpers';
import Favicon from '../img/favicon/favicon.ico';
import Favicon16 from '../img/favicon/favicon-16x16.png';
import Favicon32 from '../img/favicon/favicon-32x32.png';
import Favicon96 from '../img/favicon/favicon-96x96.png';
import FaviconAndroid192 from '../img/favicon/android-chrome-192x192.png';
import AppleTouch57 from '../img/favicon/apple-touch-icon-57x57.png';
import AppleTouch60 from '../img/favicon/apple-touch-icon-60x60.png';
import AppleTouch72 from '../img/favicon/apple-touch-icon-72x72.png';
import AppleTouch76 from '../img/favicon/apple-touch-icon-76x76.png';
import AppleTouch114 from '../img/favicon/apple-touch-icon-114x114.png';
import AppleTouch120 from '../img/favicon/apple-touch-icon-120x120.png';
import AppleTouch144 from '../img/favicon/apple-touch-icon-144x144.png';
import AppleTouch152 from '../img/favicon/apple-touch-icon-152x152.png';
import AppleTouch180 from '../img/favicon/apple-touch-icon-180x180.png';
import DefaultImage from '../img/tsg-logo-color.png';

// eslint-disable-next-line complexity
const Head = ({
	title,
	defaultTitle,
	metaKeywords,
	metaDescription,
	canonical,
	metaRobotsNoFollow,
	metaRobotsNoIndex,
	ogDescription,
	ogImage,
	ogTitle,
	twitterTitle,
	twitterDescription,
	twitterImage,
	image,
	excerpt,
	site,
	pageUrl
}) => {
	if (!metaDescription || metaDescription === '') {
		const ex = excerpt ? stripHtml(excerpt) : site.siteMeta.subtitle;
		metaDescription = ex;
	}

	if (ogTitle === '') {
		ogTitle = title && title !== '' ? title : defaultTitle;
	}

	if (twitterTitle === '') {
		twitterTitle = title && title !== '' ? title : defaultTitle;
	}

	const meta = [
		{name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
		{name: 'description', content: metaDescription},
		{name: 'keywords', content: metaKeywords},
		{property: 'og:type', content: 'website'},
		{property: 'og:locale', content: 'en_US'},
		{property: 'og:title', content: ogTitle},
		{
			property: 'og:description',
			content:
				ogDescription && ogDescription !== '' ? ogDescription : metaDescription
		},
		{
			property: 'og:image',
			content: ogImage ? ogImage : image ? image : null
		},
		{
			property: 'og:url',
			content: pageUrl && pageUrl !== '' ? pageUrl : site.siteUrl
		},
		{property: 'og:site_name', content: 'TSGWeddings'},
		{property: 'fb:app_id', content: '2179590042311519'},
		{property: 'twitter:card', content: 'summary'},
		{property: 'twitter:site', content: '@TSGWeddings'},
		{property: 'twitter:creator', content: '@TSGWeddings'},
		{property: 'twitter:title', content: twitterTitle},
		{
			property: 'twitter:description',
			content:
				twitterDescription && twitterDescription === '' ?
					twitterDescription :
					metaDescription
		},
		{
			property: 'twitter:image',
			content: twitterImage ? twitterImage : image ? image : null
		},
		{property: 'robots', content: metaRobotsNoIndex},
		{property: 'robots', content: metaRobotsNoFollow}
	];

	const links = [
		{rel: 'canonical', href: canonical},
		{rel: 'shortcut icon', href: Favicon},
		{rel: 'icon', href: Favicon16, sizes: '16x16'},
		{rel: 'icon', href: Favicon32, sizes: '32x32'},
		{rel: 'icon', href: Favicon96, sizes: '96x96'},
		{rel: 'icon', href: FaviconAndroid192, sizes: '192x192'},
		{rel: 'apple-touch-icon', href: AppleTouch57, sizes: '57x57'},
		{rel: 'apple-touch-icon', href: AppleTouch60, sizes: '60x60'},
		{rel: 'apple-touch-icon', href: AppleTouch72, sizes: '72x72'},
		{rel: 'apple-touch-icon', href: AppleTouch76, sizes: '76x76'},
		{rel: 'apple-touch-icon', href: AppleTouch114, sizes: '114x114'},
		{rel: 'apple-touch-icon', href: AppleTouch120, sizes: '120x120'},
		{rel: 'apple-touch-icon', href: AppleTouch144, sizes: '144x144'},
		{rel: 'apple-touch-icon', href: AppleTouch152, sizes: '152x152'},
		{rel: 'apple-touch-icon', href: AppleTouch180, sizes: '180x180'}
	];

	if (title) {
		title = title
			.replace('%%sep%%', '|')
			.replace('%%sitename%%', site.siteMeta.title);
		title = title.includes(` | ${site.siteMeta.title}`) ?
			title :
			`${title} | ${site.siteMeta.title}`;
	} else {
		title = `${defaultTitle} | ${site.siteMeta.title}`;
	}

	return (
		<Helmet
			htmlAttributes={{lang: 'en', amp: undefined}}
			titleAttributes={{itemprop: 'name', lang: 'en'}}
			meta={meta.map(data => (data.content && data.content !== '' ? data : {}))}
			link={links.map(link => (link.href && link.href !== '' ? link : {}))}
		>
			<title>{title}</title>
		</Helmet>
	);
};

Head.propTypes = {
	location: PropTypes.object.isRequired,
	defaultTitle: PropTypes.string,
	image: PropTypes.string,
	excerpt: PropTypes.string,
	site: PropTypes.object,
	pageUrl: PropTypes.string,
	focusKw: PropTypes.string,
	title: PropTypes.string,
	linkdex: PropTypes.string,
	metaDescription: PropTypes.string,
	metaKeywords: PropTypes.string,
	metaRobotsNoIndex: PropTypes.string,
	metaRobotsNoFollow: PropTypes.string,
	metaRobotsAdv: PropTypes.string,
	canonical: PropTypes.string,
	redirect: PropTypes.string,
	ogTitle: PropTypes.string,
	ogDescription: PropTypes.string,
	ogImage: PropTypes.string,
	twitterTitle: PropTypes.string,
	twitterImage: PropTypes.string,
	twitterDescription: PropTypes.string
};

Head.defaultProps = {
	defaultTitle: '',
	image: DefaultImage,
	excerpt: '',
	site: {
		siteMeta: {
			title: 'TSG Weddings',
			subtitle:
				'Elegant & Classy Wedding DJs. Well spoken MCs. No Corny Games. No Embarrassing Moments. DJs, Photo Booths, Up Lighting, & Videography In Boston & Massachusetts.',
			siteUrl: 'https://tsgweddings.com'
		}
	},
	pageUrl: '',
	focusKw: '',
	title: '',
	linkdex: '',
	metaDescription: '',
	metaKeywords: '',
	metaRobotsNoIndex: '',
	metaRobotsNoFollow: '',
	metaRobotsAdv: '',
	canonical: '',
	redirect: '',
	ogTitle: '',
	ogDescription: '',
	ogImage: '',
	twitterTitle: '',
	twitterImage: '',
	twitterDescription: ''
};

export default Head;
