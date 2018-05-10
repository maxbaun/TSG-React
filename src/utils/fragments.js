export const PageFragment = graphql`
fragment Page on wordpress__PAGE {
	id
	content
	title
	excerpt
	yoast {
		metaKeywords: focuskw
		title: title
		metaDescription: metadesc
		linkdex
		metakeywords
		noIndex: meta_robots_noindex
		noFollow: meta_robots_nofollow
		meta_robots_adv
		canonical
		redirect
		ogTitle: opengraph_title
		ogDescription: opengraph_description
		ogImage: opengraph_image
		twitterTitle: twitter_title
		twitterDescription: twitter_description
		twitterImage: twitter_image
	}
	acf{
		heroContent
		heroLink {
			title
			url
		}
	}
	image: featured_media {
		localFile{
			childImageSharp{
				hero: sizes(maxHeight: 650, maxWidth: 1440) {
					base64
		            aspectRatio
		            src
		            srcSet
		            sizes
		            originalImg
				}
				full: resolutions{
					src
					height
					width
					srcSet
				}
			}
		}
	}
}
`;

export const Site = graphql`
fragment Site on Site {
	id
	siteMeta :siteMetadata {
		title
		subtitle
	}
}
`;
