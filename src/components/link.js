import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import {replaceLinks, isExternalLink} from '../utils/wordpressHelpers';

export default class Link extends Component {
	static propTypes = {
		to: PropTypes.string,
		children: PropTypes.node.isRequired,
		classname: PropTypes.string,
		size: PropTypes.string,
		style: PropTypes.object
	};

	static defaultProps = {
		to: null,
		classname: 'primary',
		size: 'md',
		style: {}
	};

	render() {
		const {to, classname, children, style} = this.props;
		const isExternal = isExternalLink(to);

		const props = {
			className: classname,
			style
		};

		if (isExternal) {
			props.href = to;
		} else {
			props.to = replaceLinks(to);
		}

		return isExternal ? <a {...props}>{children}</a> : <GatsbyLink {...props}>{children}</GatsbyLink>;
	}
}
