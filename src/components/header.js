import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Logo from '../img/tsg-logo-color.png';
import CSS from '../css/modules/header.module.scss';
import {click, noop, innerHtml} from '../utils/componentHelpers';
import Link from './link';
import WindowSize from './windowSize';
import Button from './button';
import Close from './close';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuActive: false,
			dropdownHover: false
		};

		this.handleToggle = this.handleToggle.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
	}

	static propTypes = {
		windowWidth: PropTypes.number,
		menu: PropTypes.object
	};

	static defaultProps = {
		windowWidth: 0,
		menu: {}
	};

	handleToggle(menuActive) {
		this.setState({
			menuActive,
			dropdownHover: false
		});
	}

	handleMouseEnter(dropdownHover) {
		this.setState({
			dropdownHover
		});
	}

	handleMouseLeave() {
		this.setState({
			dropdownHover: false
		});
	}

	render() {
		const {menu} = this.props;
		const {menuActive, dropdownHover} = this.state;

		const fogCss = [CSS.headerFog];
		const menuCss = [CSS.headerMenu];

		if (menuActive) {
			fogCss.push(CSS.headerFogActive);
			menuCss.push(CSS.headerMenuActive);
		}

		return (
			<header className={CSS.header}>
				<div className={fogCss.join(' ')} onClick={click(this.handleToggle, false)}/>
				<div className="container-fluid">
					<div className={CSS.headerContainer}>
						<div className={CSS.headerInner}>
							<div className={CSS.logo}>
								<Link to="/">
									<img src={Logo} alt="TSG Weddings Logo" width={156} height={52}/>
								</Link>
							</div>
							<div className={CSS.toggle} onClick={click(this.handleToggle, !menuActive)}>
								<span/>
								<span/>
								<span/>
							</div>
						</div>
						<div className={menuCss.join(' ')}>
							<div className={CSS.menu}>
								<div className={CSS.close}>
									<Close backgroundColor="#bcbcbc" size={22} onClick={click(this.handleToggle, false)}/>
								</div>
								<ul>
									{menu.items &&
										menu.items.map((item, index) => {
											const isButton = item.classes && (item.classes.includes('button') || item.classes.includes('btn'));
											const isHover = index === dropdownHover;

											if (isButton) {
												return (
													<li key={item.title}>
														<Button
															classname="primary"
															to={item.url}
															style={{
																display: 'block',
																padding: '9px 25px',
																fontSize: 14,
																lineHeight: '16px',
																width: 205
															}}
														>
															{item.title}
														</Button>
													</li>
												);
											}

											const isDropdown = item.children && item.children.length;

											const itemCss = [];
											const linkCss = [CSS.link];

											if (isDropdown) {
												linkCss.push([CSS.dropdownToggle]);
											}

											if (isHover) {
												itemCss.push(CSS.dropdownHover);
											}

											return (
												<li
													key={item.title}
													className={itemCss.join(' ')}
													onMouseEnter={isDropdown ? click(this.handleMouseEnter, index) : noop}
													onMouseLeave={isDropdown ? this.handleMouseLeave : noop}
												>
													<Link to={item.url} classname={linkCss.join(' ')} onClick={click(this.handleToggle, false)}>
														{/* eslint-disable-next-line react/no-danger */}
														<span dangerouslySetInnerHTML={innerHtml(item.title)}/>
													</Link>
													{isDropdown ? (
														<div className={CSS.dropdown}>
															<ul className={CSS.dropdownInner}>
																{item.children.map(child => {
																	return (
																		<li key={child.title}>
																			<Link
																				to={child.url}
																				classname={CSS.dropdownLink}
																				onClick={click(this.handleToggle, false)}
																			>
																				{/* eslint-disable-next-line react/no-danger */}
																				<span dangerouslySetInnerHTML={innerHtml(child.title)}/>
																			</Link>
																		</li>
																	);
																})}
															</ul>
														</div>
													) : null}
												</li>
											);
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default WindowSize(Header);
