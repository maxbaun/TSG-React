import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import {replaceLinks, isExternalLink} from '../utils/wordpressHelpers';
import {noop} from '../utils/componentHelpers';

export default class Link extends Component {
	static propTypes = {
		to: PropTypes.string,
		children: PropTypes.node.isRequired,
		classname: PropTypes.string,
		size: PropTypes.string,
		style: PropTypes.object,
		onClick: PropTypes.func
	};

	static defaultProps = {
		to: null,
		classname: 'primary',
		size: 'md',
		style: {},
		onClick: noop
	};

	render() {
		const {to, classname, children, style, onClick} = this.props;
		const isExternal = isExternalLink(to);

		if (!to || to === '') {
			return children;
		}

		const props = {
			className: classname,
			style,
			onClick
		};

		if (isExternal) {
			props.href = to;
		} else {
			props.to = replaceLinks(to);
		}

		return isExternal ? <a {...props}>{children}</a> : <GatsbyLink {...props}>{children}</GatsbyLink>;
	}
}
