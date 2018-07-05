import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Logo from '../img/tsg-logo-color.png';
import CSS from '../css/modules/footer.module.scss';
import {phoneLink, emailLink} from '../utils/componentHelpers';
import Link from './link';
import WindowSize from './windowSize';
import Button from './button';
import Close from './close';

class Footer extends Component {
	static propTypes = {
		description: PropTypes.string,
		menus: PropTypes.array,
		phone: PropTypes.string,
		email: PropTypes.string,
		social: PropTypes.object,
		copy: PropTypes.string
	};

	static defaultProps = {
		description: null,
		menus: [],
		phone: null,
		email: null,
		social: {},
		copy: null
	};

	render() {
		return (
			<footer className={CSS.footer}>
				<div className="container">
					<div className={CSS.inner}>
						<div className={CSS.description}>
							<div className={CSS.descriptionInner}>
								<div className={CSS.logo}>
									<img src={Logo} alt="TSG Weddings Logo" width={181} height={59}/>
								</div>
								<p>{this.props.description}</p>
							</div>
						</div>
						{this.props.menus && this.props.menus.map(menu => {
							return (
								<div key={menu.title} className={CSS.menu}>
									<h3>{menu.title}</h3>
									<ul>
										{menu.items && menu.items.map(item => {
											return (
												<li key={item.title}>
													<Link to={item.url} classname={CSS.menuLink}>
														{item.title}
													</Link>
												</li>
											);
										})}
									</ul>
								</div>
							);
						})}
						<div className={[CSS.menu, CSS.social].join(' ')}>
							<h3>Connect With Us</h3>
							<ul>
								<li><a href={phoneLink(this.props.phone)} className={CSS.menuLink}>{this.props.phone}</a></li>
								<li><a href={emailLink(this.props.email)} className={CSS.menuLink}>{this.props.email}</a></li>
							</ul>
							<div className={CSS.socialIcons}>
								<ul>
									{this.renderIcon(this.props.social.facebook, 'facebook-f')}
									{this.renderIcon(this.props.social.pinterest, 'pinterest')}
									{this.renderIcon(this.props.social.instagram, 'instagram')}
									{this.renderIcon(this.props.social.vimeo, 'vimeo')}
									{this.renderIcon(this.props.social.youtube, 'youtube')}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className={CSS.copy}>
					<div className="container">
						<p>{this.props.copy}</p>
					</div>
				</div>
			</footer>
		);
	}

	renderIcon(link, icon) {
		if (!link || link === '') {
			return null;
		}

		return (
			<li>
				<a className={CSS.icon} href={link} target="_blank" rel="noopener noreferrer">
					<span className={`fab fa-${icon}`}/>
				</a>
			</li>
		);
	}
}

export default WindowSize(Footer);
