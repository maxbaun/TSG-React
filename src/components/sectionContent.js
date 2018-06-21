import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionContent.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Image from './image';

export default class SectionContent extends Component {
	constructor(props) {
		super(props);

		this.renderIcon = this.renderIcon.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.renderAwardGallery = this.renderAwardGallery.bind(this);
	}

	static propTypes = {
		content: PropTypes.array.isRequired,
		contentContainerWidth: PropTypes.number
	};

	static defaultProps = {
		contentContainerWidth: 0
	};

	render() {
		const {content} = this.props;

		return (
			<div className={CSS.sectionContent}>
				{content.map((component, index) => {
					const {layout} = component;

					if (layout === 'icon') {
						return this.renderIcon(component.icon, index);
					}

					if (layout === 'header') {
						return this.renderHeader(component.header, index);
					}

					if (layout === 'content') {
						return this.renderContent(component.content, index);
					}

					if (layout === 'awardGallery') {
						return this.renderAwardGallery(component.awardGalleryImages, index);
					}

					return null;
				})}
			</div>
		);
	}

	renderIcon(icon, key) {
		return (
			<div key={key} className={[CSS.icon]}>
				<span className={`icon icon-${icon}`}/>
			</div>
		);
	}

	renderHeader(headerHtml, key) {
		return (
			// eslint-disable-next-line react/no-danger
			<div key={key} dangerouslySetInnerHTML={innerHtml(headerHtml)} className={CSS.header}/>
		);
	}

	renderContent(contentHtml, key) {
		return (
			<div
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={innerHtml(contentHtml)}
				key={key}
				className={CSS.content}
				style={{
					maxWidth: this.props.contentContainerWidth,
					margin: '0 auto'
				}}
			/>
		);
	}

	renderAwardGallery(items, key) {
		const colWidth = 100 / items.length;

		return (
			<div key={key} className={CSS.awardGallery}>
				<div className={CSS.awardGalleryInner}>
					{items.map(item => {
						const {image, link} = item;

						const imageStyle = {
							width: typeof window !== 'undefined' && window.innerWidth > 576 ? `${colWidth}%` : '100%'
						};

						return (
							<div key={image.id} className={CSS.awardGalleryImage} style={imageStyle}>
								<a href={link} target="_blank">
									<Image image={image}/>
								</a>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
