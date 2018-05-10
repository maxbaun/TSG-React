const webpack = require('webpack');
const slash = require('slash');
const Promise = require('bluebird');
const path = require('path');

exports.modifyWebpackConfig = ({config}) => {
	const isDev = process.env.NODE_ENV === 'development';
	config.merge({
		plugins: [
			new webpack.DefinePlugin({
				API_URL: JSON.stringify(isDev ? 'http://tagprints.info/wp-json' : 'http://tagprints.com/wp-json')
			})
		]
	});

	return config;
};

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators;
	return Promise.all([
		getPages(graphql, createPage)
	]);
};

function getPages(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
			{
				pages: allWordpressPage {
					edges {
						node {
							id
							wpid: wordpress_id
							slug
							status
							template
							parent: wordpress_parent
						}
					}
				}
			}
			`
		).then(result => {
			if (result.errors) {
				console.log(result.errors);
				reject(result.errors);
			}

			console.log(JSON.stringify(result, null, 4))

			result.data.pages.edges.forEach(edge => {
				createPage({
					path: getSlug(edge, result.data.pages.edges),
					component: slash(getPageTemplate(edge.node.template)),
					context: {
						id: edge.node.id
					}
				});
			});

			resolve();
		});
	});
}

function getSlug(edge, edges) {
	if (!edge.node.parent) {
		return `/${edge.node.slug}`;
	}

	const parent = edges.find(e => e.node.wpid === edge.node.parent);

	return getSlug(parent, edges) + `/${edge.node.slug}`;
}

function getPageTemplate(template) {
	return path.resolve(`./src/templates/page.js`);
}
