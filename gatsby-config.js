const isDev = process.env.NODE_ENV === 'development';

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
	siteMetadata: {
		siteUrl: `https://tsgweddings.com`,
		title: `TSG Weddings`,
		subtitle: `Elegant & Classy Wedding DJs. Well spoken MCs. No Corny Games. No Embarrassing Moments. DJs, Photo Booths, Up Lighting, & Videography In Boston & Massachusetts.`
	},
	plugins: [
		// https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
		/*
		* Gatsby's data processing layer begins with “source”
		* plugins. Here the site sources its data from Wordpress.
		*/
		'gatsby-plugin-sass',
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				/*
				* The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
				* Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
				*/
				baseUrl: isDev ? 'localhost' : `admin.tsgweddings.com`,
				// The protocol. This can be http or https.
				protocol: isDev ? 'http' : `https`,
				// Indicates whether the site is hosted on wordpress.com.
				// If false, then the asumption is made that the site is self hosted.
				// If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
				// If your site is hosted on wordpress.org, then set this to false.
				hostingWPCOM: false,
				// If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
				// This feature is untested for sites hosted on Wordpress.com
				useACF: true,
				verboseOutput: true,
				concurrentRequests: 5,
				perPage: 100,
				excludedRoutes: ['/wp/v2/venue'],
				normalizers: normalizers => ([
					...normalizers.filter(n => n.name !== 'downloadMediaFiles')
				]),
				normalizer: function ({entities}) {
					return entities.map(entity => {
						if (entity.__type !== 'wordpress__wp_media') {
							return entity;
						}

						const sizes = ['thumbnail', 'medium', 'large', 'medium_large', 'full'];

						if (!entity.media_details) {
							entity.media_details = {};
						}

						entity.media_details.width = entity.media_details.width ? parseFloat(entity.media_details.width) : null;
						entity.media_details.height = entity.media_details.height ? parseFloat(entity.media_details.height) : null;

						sizes.forEach(size => {
							if (!entity.media_details.sizes) {
								entity.media_details.sizes = {};
							}

							if (entity.media_details.sizes[size]) {
								const width = entity.media_details.sizes[size].width ? parseFloat(entity.media_details.sizes[size].width) : null;
								const height = entity.media_details.sizes[size].height ? parseFloat(entity.media_details.sizes[size].height) : null;

								entity.media_details.sizes[size].width = width;
								entity.media_details.sizes[size].height = height;
							} else {
								entity.media_details.sizes[size] = {
									source_url: entity.source_url, // eslint-disable-line camelcase
									width: entity.media_details.width ? parseFloat(entity.media_details.width) : null,
									height: entity.media_details.height ? parseFloat(entity.media_details.height) : null,
									mime_type: entity.mime_type // eslint-disable-line camelcase
								};
							}
						});

						return entity;
					});
				}
			}
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: `UA-10151471-3`
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		'gatsby-plugin-react-helmet'
	]
};
