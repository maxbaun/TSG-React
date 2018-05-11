import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import CSS from '../css/modules/hero.module.css';
import {innerHtml} from '../utils/wordpressHelpers';
import Section from './section';

export default class Hero extends Component {
	static propTypes = {
		image: PropTypes.object.isRequired,
		content: PropTypes.string,
		link: PropTypes.object
	}

	static defaultProps = {
		content: null,
		link: null
	};

	render() {
		const {image, content, link} = this.props;

		return (
			<div>
				<div className={CSS.hero}>
					<div className={CSS.inner}>
						<div className={CSS.image}>
							<Img sizes={image}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
