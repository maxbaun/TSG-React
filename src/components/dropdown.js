import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/dropdown.module.scss';
import {noop, click, ref, clickedOutside} from '../utils/componentHelpers';

export default class Dropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.initialValue || null,
			active: false
		};

		this.elem = null;
		this.handleToggle = this.handleToggle.bind(this);
		this.checkClick = this.checkClick.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	static propTypes = {
		initialValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		]),
		label: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.bool
		]),
		options: PropTypes.array
	};

	static defaultProps = {
		initialValue: null,
		label: 'Select',
		onChange: noop,
		value: null,
		options: []
	};

	componentDidMount() {
		document.addEventListener('click', this.checkClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.checkClick);
	}

	checkClick(e) {
		if (clickedOutside(e, this.elem)) {
			return this.handleToggle(false);
		}
	}

	handleToggle(active) {
		this.setState({active});
	}

	handleClick(value) {
		if (this.props.onChange && typeof this.props.onChange === 'function') {
			this.props.onChange(value);
		}

		this.handleToggle(false);
	}

	render() {
		const {value, options, label} = this.props;
		const {active} = this.state;

		const wrapCss = [CSS.wrap];

		if (active) {
			wrapCss.push([CSS.wrapActive]);
		}

		return (
			<div ref={ref.call(this, 'elem')} className={wrapCss.join(' ')}>
				<label
					className={CSS.label}
					onClick={click(this.handleToggle, !active)}
				>
					{value ? value : label}
					<span className="fa fa-angle-down"/>
				</label>
				<div className={CSS.dropdown}>
					<div className={CSS.dropdownInner}>
						<ul className={CSS.list}>
							{options.map(option => {
								return (
									<li key={option} onClick={click(this.handleClick, option)}>
										{option}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
