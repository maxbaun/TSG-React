import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionHalfImage.module.scss';
import Image from './image';
import SectionContent from './sectionContent';

export default class SectionHalfImage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	static propTypes = {
		image: PropTypes.object,
		imageAlign: PropTypes.string,
		content: PropTypes.object,
		zIndex: PropTypes.number.isRequired,
		style: PropTypes.object
	};

	static defaultProps = {
		image: {},
		imageAlign: 'left',
		content: {},
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
		const {image, imageAlign, content, zIndex, style} = this.props;
		const {active} = this.state;

		const imageJsx = (
			<div className={CSS.image}>
				<Image image={image}/>
			</div>
		);
		const contentJsx = (
			<div className={CSS.content}>
				<SectionContent content={content} classname="sectionHalf"/>
			</div>
		);

		let left = imageAlign === 'left' ? imageJsx : contentJsx;
		let right = imageAlign === 'left' ? contentJsx : imageJsx;

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
							{left}
						</div>
						<div className={CSS.right} style={rightStyle}>
							{right}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
