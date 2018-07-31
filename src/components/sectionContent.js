import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionContent.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Button from './button';
import Tabs from './tabs';

export default class SectionContent extends Component {
	constructor(props) {
		super(props);

		this.renderIcon = this.renderIcon.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.renderButtons = this.renderButtons.bind(this);
		this.renderBody = this.renderBody.bind(this);
	}

	static propTypes = {
		content: PropTypes.object.isRequired,
		contentContainerWidth: PropTypes.number,
		classname: PropTypes.string
	};

	static defaultProps = {
		contentContainerWidth: 1440,
		classname: null
	};

	render() {
		const {content, classname} = this.props;

		const sectionCss = [CSS.sectionContent];

		if (CSS[classname]) {
			sectionCss.push(CSS[classname]);
		}

		return (
			<div className={sectionCss.join(' ')}>
				{content.icon ? this.renderIcon(content.icon) : null}
				{content.header ? this.renderHeader(content.header) : null}
				{this.renderBody()}
				{content.buttons ? this.renderButtons(content.buttons) : null}
			</div>
		);
	}

	renderIcon(icon) {
		return (
			<div className={[CSS.icon]}>
				<span className={`icon icon-${icon}`}/>
			</div>
		);
	}

	renderHeader(headerHtml) {
		return (
			// eslint-disable-next-line react/no-danger
			<div dangerouslySetInnerHTML={innerHtml(headerHtml)} className={CSS.header}/>
		);
	}

	renderBody() {
		const {tabs, content} = this.props.content;

		if (content) {
			return this.renderContent(content);
		}

		if (tabs) {
			return this.renderTabs(tabs);
		}

		return null;
	}

	renderContent(contentHtml) {
		return (
			<div
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={innerHtml(contentHtml)}
				className={CSS.content}
				style={{
					maxWidth: this.props.contentContainerWidth,
					margin: '0 auto'
				}}
			/>
		);
	}

	renderTabs(tabs) {
		return (
			<div className={CSS.tabs}>
				<Tabs tabs={tabs} classname="sectionContentTabs"/>
			</div>
		);
	}

	renderButtons(buttons) {
		return (
			<div
				className={CSS.buttons}
				style={{
					maxWidth: this.props.contentContainerWidth,
					marginLeft: 'auto',
					marginRight: 'auto'
				}}
			>
				{buttons.map(b => {
					const button = b.button[0];

					return (
						<Button key={button.text} to={button.url} classname={button.classname}>
							{button.text}
						</Button>
					);
				})}
			</div>
		);
	}
}
