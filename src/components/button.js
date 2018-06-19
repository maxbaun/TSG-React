import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import {replaceLinks} from '../utils/wordpressHelpers';
import CSS from '../css/modules/button.module.scss';

export default class Button extends Component {
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
		const {to, classname, children, size, style} = this.props;

		const btnClass = [CSS.btn, CSS[size], CSS[classname]].join(' ');

		if (to) {
			return (
				<Link to={replaceLinks(to)} className={btnClass} style={style}>
					{children}
				</Link>
			);
		}

		return (
			<button type="button" className={btnClass} style={style}>
				{children}
			</button>
		);
	}
}
