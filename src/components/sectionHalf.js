import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionHalf.module.scss';
import Image from './image';
import Video from './video';
import SectionContent from './sectionContent';
import WindowSize from './windowSize';

class SectionHalf extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	static propTypes = {
		right: PropTypes.object,
		left: PropTypes.object,
		zIndex: PropTypes.number.isRequired,
		style: PropTypes.object,
		windowWidth: PropTypes.number.isRequired,
		verticalCenter: PropTypes.bool
	};

	static defaultProps = {
		right: {},
		left: {},
		style: {},
		verticalCenter: false
	};

	componentDidMount() {
		const {zIndex} = this.props;

		setTimeout(() => {
			this.setState({
				active: true
			});
		}, 150 * zIndex);
	}

	render() {
		const {right, left, zIndex, style, windowWidth, verticalCenter} = this.props;
		const {active} = this.state;

		const isMobile = windowWidth < 992;

		const sectionStyle = {
			...style,
			zIndex
		};

		const leftStyle = {zIndex};
		const rightStyle = {zIndex};

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push(CSS.sectionActive);
		}

		if (verticalCenter) {
			sectionCss.push(CSS.sectionVerticalCenter);
		}

		return (
			<section className={sectionCss.join(' ')} style={sectionStyle}>
				<div className="container">
					<div className={CSS.sectionInner}>
						<div className={[CSS.left, left.content ? CSS.colContent : CSS.colImage].join(' ')} style={leftStyle}>
							{isMobile ? this.renderContent(left, right) : this.renderColumn(left)}
						</div>
						<div className={[CSS.right, right.content ? CSS.colContent : CSS.colImage].join(' ')} style={rightStyle}>
							{isMobile ? this.renderMedia(right, left) : this.renderColumn(right)}
						</div>
					</div>
				</div>
			</section>
		);
	}

	renderMedia(col1, col2) {
		if (col2.image || col2.video) {
			return this.renderColumn(col2);
		}

		return this.renderColumn(col1);
	}

	renderContent(col1, col2) {
		if (col2.content) {
			return this.renderColumn(col2);
		}

		return this.renderColumn(col1);
	}

	renderColumn(column) {
		if (column.content) {
			return (
				<div className={CSS.content}>
					<SectionContent content={column.content[0]} classname="sectionHalf"/>
				</div>
			);
		}

		let mediaJsx = null;

		if (column.image) {
			mediaJsx = (
				<div className={CSS.image}>
					<Image image={column.image}/>
				</div>
			);
		}

		if (column.video) {
			mediaJsx = (
				<div className={CSS.video}>
					<Video {...column.video[0]}/>
				</div>
			);
		}

		return <div className={CSS.media}>{mediaJsx}</div>;
	}
}

export default WindowSize(SectionHalf);
