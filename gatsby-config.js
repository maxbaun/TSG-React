module.exports = {
	siteMetadata: {
		siteUrl: `https://tagprints.com`,
		title: `TSG Weddings`,
		subtitle: `Elegant & Classy Wedding DJs. Well spoken MCs. No Corny Games. No Embarrassing Moments. DJs, Photo Booths, Up Lighting, & Videography In Boston & Massachusetts.`
	},
	plugins: [
		// https://public-api.wordpress.com/wp/v2/sites/gatsbyjsexamplewordpress.wordpress.com/pages/
		/*
		* Gatsby's data processing layer begins with “source”
		* plugins. Here the site sources its data from Wordpress.
		*/
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				/*
				* The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
				* Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
				*/
				baseUrl: `tsg.info`,
				// The protocol. This can be http or https.
				protocol: `http`,
				// Indicates whether the site is hosted on wordpress.com.
				// If false, then the asumption is made that the site is self hosted.
				// If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
				// If your site is hosted on wordpress.org, then set this to false.
				hostingWPCOM: false,
				// If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
				// This feature is untested for sites hosted on Wordpress.com
				useACF: true,
				verboseOutput: true
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		'gatsby-plugin-react-helmet'
	]
};
