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
	noFollow,
	noIndex,
	ogDescription,
	ogImage,
	ogTitle,
	twitterTitle,
	twitterDescription,
	twitterImage,
	image,
	excerpt,
	site
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
			content: ogDescription && ogDescription !== '' ? ogDescription : metaDescription
		},
		{
			property: 'og:image',
			content: ogImage && ogImage !== '' ? ogImage : image
		},
		{property: 'og:url', content: 'https://tsgweddings.com/'},
		{property: 'og:site_name', content: 'TSGWeddings'},
		{property: 'twitter:card', content: 'summary'},
		{property: 'twitter:site', content: '@TSGWeddings'},
		{property: 'twitter:creator', content: '@TSGWeddings'},
		{property: 'twitter:title', content: twitterTitle},
		{
			property: 'twitter:description',
			content: twitterDescription && twitterDescription === '' ? metaDescription : twitterDescription
		},
		{
			property: 'twitter:image',
			content: twitterImage && twitterImage !== '' ? twitterImage : image
		},
		{property: 'robots', content: noIndex},
		{property: 'robots', content: noFollow}
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
		title = title.replace('%%sep%%', '|').replace('%%sitename%%', site.siteMeta.title);
		title = title.includes(` | ${site.siteMeta.title}`) ? title : `${title} | ${site.siteMeta.title}`;
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
	title: PropTypes.string,
	defaultTitle: PropTypes.string,
	metaKeywords: PropTypes.string,
	metaDescription: PropTypes.string,
	canonical: PropTypes.string,
	noFollow: PropTypes.string,
	noIndex: PropTypes.string,
	ogDescription: PropTypes.string,
	ogImage: PropTypes.string,
	ogTitle: PropTypes.string,
	twitterTitle: PropTypes.string,
	twitterDescription: PropTypes.string,
	twitterImage: PropTypes.string,
	image: PropTypes.string,
	excerpt: PropTypes.string,
	site: PropTypes.object
};

Head.defaultProps = {
	title: '',
	defaultTitle: '',
	metaDescription: '',
	metaKeywords: '',
	canonical: '',
	noFollow: '',
	noIndex: '',
	ogDescription: '',
	ogImage: '',
	ogTitle: '',
	twitterTitle: '',
	twitterDescription: '',
	twitterImage: '',
	image: DefaultImage,
	excerpt: '',
	site: {
		siteMeta: {
			title: 'TSG Weddings',
			subtitle:
				'Elegant & Classy Wedding DJs. Well spoken MCs. No Corny Games. No Embarrassing Moments. DJs, Photo Booths, Up Lighting, & Videography In Boston & Massachusetts.'
		}
	}
};

export default Head;
