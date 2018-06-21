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
		id: wordpress_id
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

export const HomeHeroComponent = graphql`
	fragment HomeHeroComponent on WordPressAcf_homeHero {
		images {
			...LargeImage
		}
		title
		subtitle
		linkText
		linkUrl
		videoUrl
		videoImage {
			...LargeImage
		}
	}
`;

export const HeroComponent = graphql`
	fragment HeroComponent on WordPressAcf_hero {
		images {
			...LargeImage
		}
	}
`;

export const PageDescriptionContent = graphql`
	fragment PageDescriptionContent on WordPressAcf_pageDescriptionContent {
		content {
			icon
			header
			content
		}
	}
`;

export const PageDescriptionImages = graphql`
	fragment PageDescriptionImages on WordPressAcf_pageDescriptionImages {
		images {
			link
			image {
				...LargeImage
			}
		}
	}
`;

export const SectionHalfImage = graphql`
	fragment SectionHalfImage on WordPressAcf_sectionHalfImage {
		image {
			...LargeImage
		}
		imageAlign
		content {
			icon
			header
			content
			buttons {
				url
				text
				classname
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
			... on WordPressAcf_homeHero {
				...HomeHeroComponent
			}
			... on WordPressAcf_hero {
				...HeroComponent
			}
			... on WordPressAcf_pageDescriptionContent {
				...PageDescriptionContent
			}
			... on WordPressAcf_pageDescriptionImages {
				...PageDescriptionImages
			}
			... on WordPressAcf_sectionHalfImage {
				...SectionHalfImage
			}
		}
	}
`;
