import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/section.module.scss';
import WindowSize from './windowSize';
import {ref} from '../utils/componentHelpers';

// eslint-disable-next-line react/no-deprecated
class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerHeight: 0,
			angleHeightTop: props.angleHeightTop || props.angleHeight,
			angleHeightBottom: props.angleHeightBottom || props.angleHeight
		};

		this.section = null;
		this.handleResize = this.handleResize.bind(this);
		this.getStyle = this.getStyle.bind(this);
		this.isMobile = this.isMobile.bind(this);
		this.isDesktop = this.isDesktop.bind(this);
	}

	static propTypes = {
		style: PropTypes.object,
		slantTop: PropTypes.bool,
		slantBottom: PropTypes.bool,
		slantDirection: PropTypes.oneOf(['leftToRight', 'rightToLeft']),
		angleHeight: PropTypes.number,
		angleHeightBottom: PropTypes.number,
		angleHeightTop: PropTypes.number,
		backgroundColor: PropTypes.string,
		children: PropTypes.node.isRequired,
		id: PropTypes.string,
		classname: PropTypes.string,
		spacingTop: PropTypes.number,
		windowWidth: PropTypes.number,
		angleBottom: PropTypes.bool,
		angleTop: PropTypes.bool,
		setPadding: PropTypes.bool,
		breakpoint: PropTypes.number
	};

	static defaultProps = {
		style: {},
		slantTop: true,
		slantBottom: true,
		slantDirection: 'rightToLeft',
		angleHeight: 100,
		angleHeightBottom: 0,
		angleHeightTop: 0,
		backgroundColor: 'white',
		id: '',
		classname: null,
		spacingTop: 0,
		windowWidth: 0,
		angleBottom: true,
		angleTop: true,
		setPadding: true,
		breakpoint: 768
	};

	componentDidMount() {
		this.handleResize();
	}

	componentWillReceiveProps() {
		this.handleResize();
	}

	isMobile() {
		return this.props.windowWidth < this.props.breakpoint;
	}

	isDesktop() {
		return !this.isMobile();
	}

	handleResize() {
		const {inner} = this;

		if (!inner) {
			return;
		}

		const {clientWidth: width} = inner;

		let {angleHeightTop: maxAngleHeightTop, angleHeightBottom: maxAngleHeightBottom, angleHeight: maxAngleHeight} = this.props;

		let angleHeightTop = width * 0.055 + 70;
		let angleHeightBottom = width * 0.055 + 70;

		let angleTopMax = maxAngleHeightTop ? maxAngleHeightTop : maxAngleHeight;
		let angleBottomMax = maxAngleHeightBottom ? maxAngleHeightBottom : maxAngleHeight;

		if (angleHeightTop > angleTopMax) {
			angleHeightTop = angleTopMax;
		}

		if (angleHeightBottom > angleBottomMax) {
			angleHeightBottom = angleBottomMax;
		}

		this.setState({
			innerHeight: inner.offsetHeight,
			angleHeightTop: width < this.props.breakpoint ? 0 : angleHeightTop,
			angleHeightBottom: width < this.props.breakpoint ? 0 : angleHeightBottom
		});
	}

	getStyle() {
		let {style, slantDirection, angleTop, angleBottom} = this.props;

		if (!this.inner) {
			return {
				...style,
				opacity: 0
			};
		}

		const {innerHeight, angleHeightTop, angleHeightBottom} = this.state;
		const reversed = slantDirection === 'rightToLeft';

		const bottomCoord = innerHeight + angleHeightBottom;
		let clipPath = reversed ?
			`polygon(0 ${angleTop ? angleHeightTop : 0}px, 100% 0, 100% 100%, 0 ${angleBottom ? `${bottomCoord}px` : '100%'}` :
			`polygon(0 0, 100% ${angleTop ? angleHeightTop : 0}px, 100% ${angleBottom ? `${bottomCoord}px` : '100%'}, 0 100%`;

		style = {
			...style,
			opacity: innerHeight ? 1 : 0
		};

		if (angleHeightTop > 0 || angleHeightBottom > 0) {
			style = {
				...style,
				marginTop: angleTop ? angleHeightTop * -1 : 0,
				clipPath,
				WebkitClipPath: clipPath
			};
		}

		return style;
	}

	render() {
		const {backgroundColor, id, classname, spacingTop, angleBottom, setPadding, angleTop} = this.props;
		const {angleHeightTop, angleHeightBottom} = this.state;

		const sectionClass = [CSS.section];

		if (CSS[classname]) {
			sectionClass.push(CSS[classname]);
		}

		return (
			<section ref={ref.call(this, 'section')} id={id} className={sectionClass.join(' ')} style={this.getStyle()}>
				<div
					style={{
						// MaxWidth: 1440,
						margin: `${this.isDesktop() ? spacingTop : 0}px auto 0`
					}}
					className={CSS.wrap}
				>
					<div
						ref={ref.call(this, 'inner')}
						className={CSS.inner}
						style={{
							backgroundColor,
							paddingTop: setPadding && angleTop ? angleHeightTop : 0,
							paddingBottom: setPadding && angleBottom ? angleHeightBottom : 0
						}}
					>
						<div className={CSS.innerWrap}>{this.props.children}</div>
					</div>
				</div>
			</section>
		);
	}
}

export default WindowSize(Section);
