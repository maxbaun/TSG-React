import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import CSS from '../css/modules/section.module.css';
import {ref} from '../utils/componentHelpers';

const DEFAULT_ANGLE_HEIGHT = 150;

function debounce(func, wait, immediate) {
	var timeout;

	return () => {
		var context = this;
		var args = arguments;

		var later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};

		var callNow = immediate && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
};

export default class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerHeight: 0,
			angleHeight: DEFAULT_ANGLE_HEIGHT
		};

		this.section = null;
		this.handleResize = debounce(this.handleResize.bind(this), 150);
		this.getStyle = this.getStyle.bind(this);
	}

	static propTypes = {
		style: PropTypes.object,
		slantTop: PropTypes.bool,
		slantBottom: PropTypes.bool,
		slantDirection: PropTypes.oneOf(['leftToRight', 'rightToLeft']),
		angleHeight: PropTypes.number,
		backgroundColor: PropTypes.string
	}

	static defaultProps = {
		style: {},
		slantTop: true,
		slantBottom: true,
		slantDirection: 'rightToLeft',
		angleHeight: 150,
		backgroundColor: 'white'
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	isMobile() {
		return false;
	}

	handleResize() {
		const {inner} = this;

		if (!inner) {
			return;
		}

		const {clientWidth: width} = inner;
		let angleHeight = DEFAULT_ANGLE_HEIGHT;

		angleHeight = (width * 0.055) + 70;

		// if (width < 600) {
		// 	angleHeight = 100;
		// } else if (width < 800) {
		// 	angleHeight = 110;
		// } else if (width < 1000) {
		// 	angleHeight = 120;
		// } else if (width < 1200) {
		// 	angleHeight = 130;
		// } else if (width < 1400) {
		// 	angleHeight = 140;
		// } else if (width < 1600) {
		// 	angleHeight = 150;
		// } else if (width < 1800) {
		// 	angleHeight = 160;
		// } else if (width < 2000) {
		// 	angleHeight = 180;
		// }

		this.setState({
			innerHeight: inner.getBoundingClientRect().height,
			angleHeight
		});
	}

	getStyle() {
		const {style, slantDirection} = this.props;

		if (!this.inner) {
			return {
				...style,
				opacity: 0
			};
		}

		const {innerHeight, angleHeight} = this.state;
		const reversed = slantDirection === 'rightToLeft';

		const bottomCoord = innerHeight + angleHeight;
		let clipPath = reversed ?
			`polygon(0 ${angleHeight}px, 100% 0, 100% 100%, 0 ${bottomCoord}px` :
			`polygon(0 0, 100% ${angleHeight}px, 100% ${bottomCoord}px, 0 100%`;

		return {
			...style,
			marginTop: angleHeight * -1,
			clipPath,
			WebkitClipPath: clipPath,
			opacity: innerHeight ? 1 : 0
		};
	}

	render() {
		const {backgroundColor, slantDirection} = this.props;
		const {angleHeight} = this.state;

		const contentAlign = slantDirection === 'rightToLeft' ? 'left' : 'right';

		return (
			<div ref={ref.call(this, 'section')} className={CSS.section} style={this.getStyle()}>
				<div
					style={{
						// maxWidth: 1440,
						margin: '0 auto'
					}}
					className={CSS.wrap}
				>
					<div
						ref={ref.call(this, 'inner')}
						className={CSS.inner}
						style={{
							backgroundColor,
							paddingTop: angleHeight,
							paddingBottom: angleHeight,
						}}
					>
						{contentAlign === 'left' ?
							<div className={CSS.innerWrap}>
								<div className={CSS.content}>
									{this.props.children}
								</div>
								<div className={CSS.imageWrap}>
									<div className={CSS.image}>
										<Img sizes={this.props.image}/>
									</div>
								</div>
							</div> :
							<div className={CSS.innerWrap}>
								<div className={CSS.imageWrap}>
									<div className={CSS.image}>
										<Img sizes={this.props.image}/>
									</div>
								</div>
								<div className={CSS.content}>
									{this.props.children}
								</div>
							</div>

						}
					</div>
				</div>
			</div>
		);
	}
}
