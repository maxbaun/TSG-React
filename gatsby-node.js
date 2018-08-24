const webpack = require('webpack');
const slash = require('slash');
const Promise = require('bluebird');
const path = require('path');

exports.modifyWebpackConfig = ({config}) => {
	const isDev = process.env.NODE_ENV === 'development';
	config.merge({
		plugins: [
			new webpack.DefinePlugin({
				API_URL: JSON.stringify(isDev ? 'http://tsg.info/wp-json' : 'https://tsg.d3applications.com/wp-json')
			})
		]
	});

	return config;
};

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators;
	return Promise.all([
		getPages(graphql, createPage),
		getDjs(graphql, createPage),
		getVenues(graphql, createPage),
		getReviews(graphql, createPage),
		getPosts(graphql, createPage)
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
								title
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

			result.data.pages.edges.forEach(edge => {
				const isHome = edge.node.title.toLowerCase() === 'home' || edge.node.slug === 'home';

				if (edge.node.slug === 'do-not-delete' || edge.node.title === 'DO NOT DELETE') {
					return;
				}

				let path = slash(getSlug(edge, result.data.pages.edges));

				if (isHome) {
					path = slash('/');
				}

				createPage({
					path,
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

function getPosts(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					posts: allWordpressPost {
						edges {
							node {
								id
								wpid: wordpress_id
								title
								slug
								status
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

			result.data.posts.edges.forEach(edge => {
				createPage({
					path: slash(`/${edge.node.slug}`),
					component: path.resolve(`./src/templates/post.js`),
					context: {
						id: edge.node.id
					}
				});
			});

			resolve();
		});
	});
}

function getDjs(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					pages: allWordpressWpDj {
						edges {
							node {
								id
								wpid: wordpress_id
								title
								slug
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

			result.data.pages.edges.forEach(edge => {
				createPage({
					path: slash(`/dj${getSlug(edge, result.data.pages.edges)}`),
					component: slash(path.resolve(`./src/templates/dj.js`)),
					context: {
						id: edge.node.id
					}
				});
			});

			resolve();
		});
	});
}

function getVenues(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					venues: allWordpressTsgVenues {
						edges {
							node {
								id
								wpid: wordpress_id
								title
								slug
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

			result.data.venues.edges.forEach(edge => {
				createPage({
					path: slash(`/venue${getSlug(edge, result.data.venues.edges)}`),
					component: slash(path.resolve(`./src/templates/venue.js`)),
					context: {
						id: edge.node.id
					}
				});
			});

			resolve();
		});
	});
}

function getReviews(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					venues: allWordpressWpReview {
						edges {
							node {
								id
								wpid: wordpress_id
								title
								slug
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

			result.data.venues.edges.forEach(edge => {
				createPage({
					path: slash(`/review${getSlug(edge, result.data.venues.edges)}`),
					component: slash(path.resolve(`./src/templates/review.js`)),
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
	if (template === 'template-venues.php') {
		return path.resolve('./src/templates/venues.js');
	}

	if (template === 'template-vendors.php') {
		return path.resolve('./src/templates/vendors.js');
	}

	if (template === 'template-contact.php') {
		return path.resolve('./src/templates/contact.js');
	}

	if (template === 'template-availability.php') {
		return path.resolve('./src/templates/availability.js');
	}

	if (template === 'template-blog.php') {
		return path.resolve('./src/templates/blog.js');
	}

	return path.resolve(`./src/templates/page.js`);
}
