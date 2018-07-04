import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Logo from '../img/tsg-logo-color.png';
import CSS from '../css/modules/header.module.scss';
import Link from './link';
import WindowSize from './windowSize';
import Button from './button';

class Header extends Component {
	static propTypes = {
		windowWidth: PropTypes.number,
		menu: PropTypes.object
	}

	static defaultProps = {
		windowWidth: 0,
		menu: {}
	}

	render() {
		const {menu} = this.props;
		console.log(menu);
		return (
			<header className={CSS.header}>
				<div className="container">
					<div className={CSS.headerContainer}>
						<div className={CSS.headerInner}>
							<div className={CSS.logo}>
								<img src={Logo} alt="TSG Weddings Logo" width={156} height={52}/>
							</div>
							<div className={CSS.toggle}>
								<span/>
								<span/>
								<span/>
							</div>
						</div>
						<div className={CSS.headerMenu}>
							<div className={CSS.menu}>
								<ul>
									{menu.items && menu.items.map(item => {
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

										return (
											<li key={item.title}>
												<Link
													to={item.url}
													classname={CSS.link}
												>
													{item.title}
												</Link>
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
