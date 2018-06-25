import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/tabs.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import {ref, click} from '../utils/componentHelpers';

export default class Tabs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			width: 0,
			activeIndex: 0
		};

		this.tabs = null;
		this.handleResize = this.handleResize.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getBodyTabStyle = this.getBodyTabStyle.bind(this);
	}

	static propTypes = {
		tabs: PropTypes.array,
		classname: PropTypes.string
	};

	static defaultProps = {
		tabs: [],
		classname: null
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);

		setTimeout(() => {
			this.handleResize();
		}, 300);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	getBodyTabStyle(index) {
		const {activeIndex, width} = this.state;
		let left = 0;
		let opacity = 1;

		return {
			opacity
		};
	}

	handleResize() {
		const {tabs} = this;

		if (!tabs) {
			return;
		}

		const tabWidth = tabs.offsetWidth;

		this.setState({
			width: tabWidth,
			active: true
		});
	}

	handleClick(activeIndex) {
		this.setState({activeIndex});
	}

	render() {
		const {classname, tabs} = this.props;
		const {width, activeIndex, active} = this.state;
		const tabCss = [CSS.tabs];

		if (active) {
			tabCss.push(CSS.tabsActive);
		}

		if (classname && classname !== '' && CSS[classname]) {
			tabCss.push(CSS[classname]);
		}

		const bodyStyle = {
			transform: `translate3d(${width * activeIndex * -1}px, 0, 0)`
		};

		return (
			<div ref={ref.call(this, 'tabs')} className={tabCss.join(' ')}>
				<div className={CSS.header}>
					<ul>
						{tabs.map((tab, index) => {
							return (
								<li
									key={tab.title}
									onClick={click(this.handleClick, index)}
									className={index === activeIndex ? CSS.headerTabActive : CSS.headerTab}
								>
									{tab.title}
								</li>
							);
						})}
					</ul>
				</div>
				<div className={CSS.body}>
					<ul style={bodyStyle}>
						{tabs.map((tab, index) => {
							return (
								<li
									key={tab.title}
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={innerHtml(tab.content)}
									className={index === activeIndex ? CSS.bodyTabActive : CSS.bodyTab}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
