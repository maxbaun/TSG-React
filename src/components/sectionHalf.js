import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionHalf.module.scss';
import Image from './image';
import Video from './video';
import SectionContent from './sectionContent';

export default class SectionHalf extends Component {
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
		style: PropTypes.object
	};

	static defaultProps = {
		right: {},
		left: {},
		style: {}
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
		const {right, left, zIndex, style} = this.props;
		const {active} = this.state;

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

		return (
			<section className={sectionCss.join(' ')} style={sectionStyle}>
				<div className="container">
					<div className={CSS.sectionInner}>
						<div className={CSS.left} style={leftStyle}>
							{this.renderColumn(left)}
						</div>
						<div className={CSS.right} style={rightStyle}>
							{this.renderColumn(right)}
						</div>
					</div>
				</div>
			</section>
		);
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
