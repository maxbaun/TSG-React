import React from 'react';
import PropTypes from 'prop-types';

import './utils/fragments';

let stylesStr;

if (process.env.NODE_ENV === `production`) {
	try {
		stylesStr = require(`!raw-loader!../public/styles.css`);
	} catch (e) {
		console.log(e);
	}
}

export default class Html extends React.Component {
	static propTypes = {
		headComponents: PropTypes.node.isRequired,
		body: PropTypes.node.isRequired,
		postBodyComponents: PropTypes.node.isRequired
	};

	render() {
		let css;
		if (process.env.NODE_ENV === `production`) {
			css = (
				<style
					id="gatsby-inlined-css"
					dangerouslySetInnerHTML={{__html: stylesStr}} // eslint-disable-line
				/>
			);
		}

		return (
			<html op="news" lang="en">
				<head>
					{this.props.headComponents}
					<meta name="referrer" content="origin"/>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=no"/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
					<link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet"/>
					<link href="https://fonts.googleapis.com/css?family=Raleway:400,500,700" rel="stylesheet"/>
					<link href="https://fonts.googleapis.com/css?family=Playfair+Display+SC" rel="stylesheet"/>
					<script src="https://tsgtools.com/check_req_info_form.js"/>
					{css}
				</head>
				<body data-theme="default">
					<div
						id="___gatsby"
						dangerouslySetInnerHTML={{__html: this.props.body}} //eslint-disable-line
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		);
	}
}
