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
		verticalCenter: sectionHalfVerticalCenter
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
		disableAngleBottom: pageDescriptionContentDisableAngleBottom
		sectionContent: content {
			icon
			header
			contentType
			content
		}
		video: pageDescriptionContentVideo {
			url
			thumbnail {
				...LargeImage
			}
		}
	}
`;

export const PageDescriptionImages = graphql`
	fragment PageDescriptionImages on WordPressAcf_pageDescriptionImages {
		disableAngleBottom: pageDescriptionImagesDisableAngleBottom
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
		reviews: sectionReviewsItems {
			title: post_title
			content: post_content
			excerpt: post_excerpt
			url
			acf {
				location: reviewLocation
			}
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
		bios: sectionBiosBios {
			title: post_title
			excerpt: post_excerpt
			url
			image: featured_media {
				...LargeImage
			}
		}
	}
`;

export const SectionAwards = graphql`
	fragment SectionAwards on WordPressAcf_sectionAwards {
		title: sectionAwardsTitle
		images: sectionAwardsImages {
			image {
				...LargeImage
			}
			link
		}
	}
`;

export const SectionSlant = graphql`
	fragment SectionSlant on WordPressAcf_sectionSlant {
		slantDirection: sectionSlantSlantDirection
		image: sectionSlantImage {
			...LargeImage
		}
		disableSlantTop: sectionSlantDisableSlantTop
		disableSlantBottom: sectionSlantDisableSlantBottom
		sectionContent: sectionSlantContent {
			icon
			header
			contentType
			content
			buttons {
				button {
					text
					url
					classname
				}
			}
		}
	}
`;

export const SectionFacts = graphql`
	fragment SectionFacts on WordPressAcf_sectionFacts {
		title: sectionFactsTitle
		facts: sectionFactsFacts {
			icon
			text
		}
		link: sectionFactsLink {
			title
			url
		}
	}
`;

export const SectionFeatured = graphql`
	fragment SectionFeatured on WordPressAcf_sectionFeatured {
		image: sectionFeaturedImage {
			...LargeImage
		}
		sectionContent: sectionFeaturedContent {
			header
			contentType
			content
			buttons {
				button {
					text
					url
					classname
				}
			}
		}
	}
`;

export const SectionServices = graphql`
	fragment SectionServices on WordPressAcf_sectionServices {
		services: sectionServicesServices {
			title
			text
			image {
				...LargeImage
			}
		}
		sectionContent: sectionServicesContent {
			header
			contentType
			sectionContent: content
			icon
		}
	}
`;

export const FullWidthImage = graphql`
	fragment FullWidthImage on WordPressAcf_fullWidthImage {
		image: fullWidthImageImage {
			...LargeImage
		}
		disableSlantTop: fullWidthImageDisableSlantTop
		disableSlantBottom: fullWidthImageDisableSlantBottom
		slantDirection: fullWidthImageSlantDirection
	}
`;

export const SectionComponents = graphql`
	fragment SectionComponents on WordPressAcf_sectionComponents {
		header: sectionComponentsHeader
		components: sectionComponentsComponents {
			title
			titleAlign
			text
		}
	}
`;

export const SectionPlanning = graphql`
	fragment SectionPlanning on WordPressAcf_sectionPlanning {
		sectionHeader: sectionPlanningHeader {
			header
			content
		}
		tools: sectionPlanningTools {
			image {
				...LargeImage
			}
			title
			text
			link
		}
		help: sectionPlanningHelp
	}
`;

export const FullWidthContent = graphql`
	fragment FullWidthContent on WordPressAcf_fullWidthContent {
		sectionContent: fullWidthContentContent {
			icon
			header
			contentType
			content
		}
		maxWidth: fullWidthContentMaxWidth
	}
`;

export const SectionForm = graphql`
	fragment SectionForm on WordPressAcf_sectionForm {
		sectionContent: sectionFormContent {
			header
			content
		}
		form: sectionFormForm
	}
`;

export const Page = graphql`
	fragment Page on wordpress__PAGE {
		id
		content
		title
		excerpt
		acf {
			hasCallToAction
		}
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
			ogImage: opengraph_image {
				...LargeImage
			}
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
			... on WordPressAcf_sectionAwards {
				...SectionAwards
			}
			... on WordPressAcf_sectionSlant {
				...SectionSlant
			}
			... on WordPressAcf_sectionFacts {
				...SectionFacts
			}
			... on WordPressAcf_sectionFeatured {
				...SectionFeatured
			}
			... on WordPressAcf_sectionServices {
				...SectionServices
			}
			... on WordPressAcf_fullWidthImage {
				...FullWidthImage
			}
			... on WordPressAcf_sectionComponents {
				...SectionComponents
			}
			... on WordPressAcf_sectionPlanning {
				...SectionPlanning
			}
			... on WordPressAcf_fullWidthContent {
				...FullWidthContent
			}
			... on WordPressAcf_sectionForm {
				...SectionForm
			}
		}
	}
`;

export const Venue = graphql`
	fragment Venue on wordpress__wp_venue {
		id
		content
		title
		slug
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
		image: featured_media {
			...LargeImage
		}
		acf {
			location: venueLocation
			gallery: venueGallery {
				...LargeImage
			}
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
			... on WordPressAcf_sectionAwards {
				...SectionAwards
			}
			... on WordPressAcf_sectionSlant {
				...SectionSlant
			}
			... on WordPressAcf_sectionFacts {
				...SectionFacts
			}
			... on WordPressAcf_sectionFeatured {
				...SectionFeatured
			}
			... on WordPressAcf_sectionServices {
				...SectionServices
			}
			... on WordPressAcf_fullWidthImage {
				...FullWidthImage
			}
			... on WordPressAcf_sectionComponents {
				...SectionComponents
			}
			... on WordPressAcf_sectionPlanning {
				...SectionPlanning
			}
			... on WordPressAcf_fullWidthContent {
				...FullWidthContent
			}
		}
	}
`;

export const Vendor = graphql`
	fragment Vendor on wordpress__wp_vendor {
		id
		content
		title
		slug
		vendorcategory
		acf {
			phone: vendorPhone
			email: vendorEmail
			link: vendorLink
			venuePage: vendorVenuePage {
				url
			}
		}
	}
`;

export const DJ = graphql`
	fragment DJ on wordpress__wp_dj {
		id
		content
		title
		excerpt
		slug
		image: featured_media {
			...LargeImage
		}
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
	}
`;

export const Post = graphql`
	fragment Post on wordpress__POST {
		id
		content
		title
		excerpt
		slug
		image: featured_media {
			...LargeImage
		}
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
	}
`;

export const Review = graphql`
	fragment Review on wordpress__wp_review {
		id
		content
		title
		excerpt
		slug
		image: featured_media {
			...LargeImage
		}
		acf {
			link: reviewLink
			services: reviewServices
			rating: reviewRating
			location: reviewLocation
			date: reviewDate
		}
	}
`;
