import graphql from 'graphql';

export const Site = graphql`
	fragment Site on Site {
		id
		siteMeta: siteMetadata {
			title
			subtitle
		}
	}
`;

export const MenuItems = graphql`
	fragment MenuItems on wordpress__wp_api_menus_menus_items {
		items {
			title
			url
			classes
			children: wordpress_children {
				title
				url
			}
		}
	}
`;

export const BaseImage = graphql`
	fragment BaseImage on wordpress__wp_media {
		url: source_url
		mediaDetails: media_details {
			width
			height
		}
	}
`;

export const ImageSizes = graphql`
	fragment ImageSizes on ImageSharpSizes {
		base64
		aspectRatio
		src
		srcSet
		sizes
	}
`;

export const LargeImage = graphql`
	fragment LargeImage on wordpress__wp_media {
		...BaseImage
		localFile {
			childImageSharp {
				sizes(maxWidth: 1600) {
					...ImageSizes
				}
			}
		}
	}
`;

export const HeroComponent = graphql`
	fragment HeroComponent on WordPressAcf_hero {
		hero {
			image {
				...LargeImage
			}
			title
			subtitle
			link {
				url
				title
			}
			video {
				thumbnail {
					...LargeImage
				}
				videoUrl
			}
		}
	}
`;

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
		acf {
			section: flexibleContent_page {
				type: __typename
			}
		}
		children {
			type: __typename
			... on WordPressAcf_hero {
				...HeroComponent
			}
		}
		image: featured_media {
			localFile {
				childImageSharp {
					hero: sizes(maxHeight: 650, maxWidth: 1440) {
						base64
						aspectRatio
						src
						srcSet
						sizes
						originalImg
					}
					full: resolutions {
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
