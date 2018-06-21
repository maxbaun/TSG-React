import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import CSS from '../css/modules/section.module.scss';
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
}

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
		backgroundColor: PropTypes.string,
		children: PropTypes.node.isRequired,
		id: PropTypes.string,
		classname: PropTypes.string
	};

	static defaultProps = {
		style: {},
		slantTop: true,
		slantBottom: true,
		slantDirection: 'rightToLeft',
		angleHeight: 150,
		backgroundColor: 'white',
		id: '',
		classname: null
	};

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

		angleHeight = width * 0.055 + 70;

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
		const {backgroundColor, id, classname} = this.props;
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
							paddingBottom: angleHeight
						}}
					>
						<div className={CSS.innerWrap}>{this.props.children}</div>
					</div>
				</div>
			</div>
		);
	}
}
