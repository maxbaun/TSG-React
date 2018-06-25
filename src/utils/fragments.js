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

export const SectionHalf = graphql`
	fragment SectionHalf on WordPressAcf_sectionHalf {
		left {
			image {
				...LargeImage
			}
			video {
				url
				thumbnail {
					...LargeImage
				}
			}
			content {
				icon
				header
				content
				tabs {
					title
					content
				}
				buttons {
					button {
						text
						url
						classname
					}
				}
			}
		}
		right {
			image {
				...LargeImage
			}
			video {
				url
				thumbnail {
					...LargeImage
				}
			}
			content {
				icon
				header
				content
				tabs {
					title
					content
				}
				buttons {
					button {
						text
						url
						classname
					}
				}
			}
		}
	}
`;

export const PageDescriptionContent = graphql`
	fragment PageDescriptionContent on WordPressAcf_pageDescriptionContent {
		sectionContent: content {
			icon
			header
			contentType
			content
		}
	}
`;

export const PageDescriptionImages = graphql`
	fragment PageDescriptionImages on WordPressAcf_pageDescriptionImages {
		images {
			image {
				...LargeImage
			}
			link
		}
	}
`;

export const Hero = graphql`
	fragment Hero on WordPressAcf_hero {
		images {
			...LargeImage
		}
		video {
			url
			thumbnail {
				...LargeImage
			}
		}
		title
		subtitle
		link {
			title
			url
		}
	}
`;

export const SectionReviews = graphql`
	fragment SectionReviews on WordPressAcf_sectionReviews {
		header: sectionReviewsHeader
		content: sectionReviewsContent
		reviews: sectionReviewsReviews {
			name
			review
		}
		link: sectionReviewsLink {
			title
			url
		}
	}
`;

export const SectionBios = graphql`
	fragment SectionBios on WordPressAcf_sectionBios {
		header: sectionBiosHeader
		content: sectionBiosContent
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
		children {
			type: __typename
			... on WordPressAcf_sectionHalf {
				...SectionHalf
			}
			... on WordPressAcf_pageDescriptionImages {
				...PageDescriptionImages
			}
			... on WordPressAcf_pageDescriptionContent {
				...PageDescriptionContent
			}
			... on WordPressAcf_hero {
				...Hero
			}
			... on WordPressAcf_sectionReviews {
				...SectionReviews
			}
			... on WordPressAcf_sectionBios {
				...SectionBios
			}
		}
	}
`;
