const webpack = require('webpack');
const slash = require('slash');
const Promise = require('bluebird');
const path = require('path');

exports.modifyWebpackConfig = ({config}) => {
	const isDev = process.env.NODE_ENV === 'development';
	config.merge({
		plugins: [
			new webpack.DefinePlugin({
				API_URL: JSON.stringify(
					isDev ?
						'http://admin.tsgweddings.com/wp-json' :
						'https://admin.tsgweddings.com/wp-json'
				)
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
		getPosts(graphql, createPage),
		getCategories(graphql, createPage),
		getTags(graphql, createPage)
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
				const isHome =
					edge.node.title.toLowerCase() === 'home' || edge.node.slug === 'home';

				if (isDeletePage(edge.node)) {
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
				if (isDeletePage(edge.node)) {
					return;
				}

				createPage({
					path: slash(`/blog/${edge.node.slug}`),
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

function getCategories(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					categories: allWordpressCategory(filter: {count: {gt: 0}}) {
						edges {
							node {
								id
								wpid: wordpress_id
								name
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

			result.data.categories.edges.forEach(category => {
				createPage({
					path: slash(`/blog/category/${category.node.slug}`),
					component: path.resolve(`./src/templates/category.js`),
					context: {
						name: category.node.name
					}
				});
			});

			resolve();
		});
	});
}

function getTags(graphql, createPage) {
	return new Promise((resolve, reject) => {
		graphql(
			`
				{
					tags: allWordpressTag(filter: {count: {gt: 0}}) {
						edges {
							node {
								id
								wpid: wordpress_id
								name
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

			result.data.tags.edges.forEach(edge => {
				createPage({
					path: slash(`/blog/tag/${edge.node.slug}`),
					component: path.resolve(`./src/templates/tag.js`),
					context: {
						name: edge.node.name
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
				if (isDeletePage(edge.node)) {
					return;
				}

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
				if (isDeletePage(edge.node)) {
					return;
				}

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

function isDeletePage(node) {
	return (
		node.slug.includes('delete') ||
		node.slug === 'do-not-delete' ||
		node.title === 'DO NOT DELETE' ||
		node.title.includes('DELETE')
	);
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
