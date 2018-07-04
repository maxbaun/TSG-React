import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/section.module.scss';
import WindowSize from './windowSize';
import {ref} from '../utils/componentHelpers';

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
}

// eslint-disable-next-line react/no-deprecated
class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			innerHeight: 0,
			angleHeight: props.angleHeight
		};

		this.section = null;
		this.handleResize = debounce(this.handleResize.bind(this), 300);
		this.getStyle = this.getStyle.bind(this);
	}

	static propTypes = {
		style: PropTypes.object,
		slantTop: PropTypes.bool,
		slantBottom: PropTypes.bool,
		slantDirection: PropTypes.oneOf(['leftToRight', 'rightToLeft']),
		angleHeight: PropTypes.number,
		backgroundColor: PropTypes.string,
		children: PropTypes.node.isRequired,
		id: PropTypes.string,
		classname: PropTypes.string,
		spacingTop: PropTypes.number,
		windowWidth: PropTypes.number,
		angleBottom: PropTypes.bool,
		angleTop: PropTypes.bool
	};

	static defaultProps = {
		style: {},
		slantTop: true,
		slantBottom: true,
		slantDirection: 'rightToLeft',
		angleHeight: 100,
		backgroundColor: 'white',
		id: '',
		classname: null,
		spacingTop: 0,
		windowWidth: 0,
		angleBottom: true,
		angleTop: true
	};

	componentDidMount() {
		this.handleResize();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.windowWidth !== this.props.windowWidth) {
			this.handleResize();
		}
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

		let angleHeight = (width * 0.055) + 70;

		if (angleHeight > this.props.angleHeight) {
			angleHeight = this.props.angleHeight;
		}

		this.setState({
			innerHeight: inner.offsetHeight,
			angleHeight: width < 768 ? 0 : angleHeight
		});
	}

	getStyle() {
		let {style, slantDirection} = this.props;

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

		style = {
			...style,
			opacity: innerHeight ? 1 : 0
		};

		if (angleHeight > 0) {
			style = {
				...style,
				marginTop: angleHeight * -1,
				clipPath,
				WebkitClipPath: clipPath
			};
		}

		return style;
	}

	render() {
		const {backgroundColor, id, classname, spacingTop, angleBottom} = this.props;
		const {angleHeight} = this.state;

		const sectionClass = [CSS.section];

		if (CSS[classname]) {
			sectionClass.push(CSS[classname]);
		}

		return (
			<div ref={ref.call(this, 'section')} id={id} className={sectionClass.join(' ')} style={this.getStyle()}>
				<div
					style={{
						// MaxWidth: 1440,
						margin: `${spacingTop}px auto 0`
					}}
					className={CSS.wrap}
				>
					<div
						ref={ref.call(this, 'inner')}
						className={CSS.inner}
						style={{
							backgroundColor,
							paddingTop: angleHeight,
							paddingBottom: angleBottom ? angleHeight : 0
						}}
					>
						<div className={CSS.innerWrap}>{this.props.children}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WindowSize(Section);
