import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import 'swiper/dist/css/swiper.css';

import '../css/plugins/normalize.css';
import '../css/plugins/icomoon/style.css';
import '../css/plugins/bootstrap-grid.css';
import '../css/plugins/fontawesome/css/all.css';
import '../css/utils/global.scss';

import Header from '../components/header';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	};

	render() {
		console.log(this.props.data);
		return (
			<div id="app">
				<Header menu={this.props.data.mainMenu}/>
				<main className="main">{this.props.children()}</main>
			</div>
		);
	}
}

import {Site, MenuItems} from '../utils/fragments'; // eslint-disable-line no-unused-vars
export const mainLayoutQuery = graphql`
	query mainLayoutQuery {
		mainMenu: wordpressWpApiMenusMenusItems(name: {eq: "Main Nav"}) {
			...MenuItems
		}
		footerMenu1: wordpressWpApiMenusMenusItems(name: {eq: "Footer 1"}) {
			...MenuItems
		}
		footerMenu2: wordpressWpApiMenusMenusItems(name: {eq: "Footer 2"}) {
			...MenuItems
		}
		site {
			...Site
		}
		options: wordpressAcfOptions {
			footerDescription
			phone: contactPhoneNumber
			email: contactEmail
			social: contactSocial {
				facebook
				pinterest
				instagram
				vimeo
				youtube
			}
		}
	}
`;
