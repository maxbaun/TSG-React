import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Logo from '../img/tsg-logo-color.png';
import CSS from '../css/modules/header.module.scss';
import {click} from '../utils/componentHelpers';
import Link from './link';
import WindowSize from './windowSize';
import Button from './button';
import Close from './close';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuActive: false
		};

		this.handleToggle = this.handleToggle.bind(this);
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
		this.setState({menuActive});
	}

	render() {
		const {menu} = this.props;
		const {menuActive} = this.state;

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
									<Close backgroundColor="#3C3C3C" size={22} onClick={click(this.handleToggle, false)}/>
								</div>
								<ul>
									{menu.items &&
										menu.items.map(item => {
											const isButton = item.classes && (item.classes.includes('button') || item.classes.includes('btn'));

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

											const linkCss = [CSS.link];

											if (isDropdown) {
												linkCss.push([CSS.dropdownToggle]);
											}

											return (
												<li key={item.title} className={isDropdown ? CSS.hasDropdown : ''}>
													<Link to={item.url} classname={linkCss.join(' ')} onClick={click(this.handleToggle, false)}>
														{item.title}
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
																				{child.title}
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
