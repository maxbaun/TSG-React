import React, {Component} from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';

import '../css/plugins/normalize.css';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	};

	render() {
		return (
			<div id="app">
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
		site {
			...Site
		}
	}
`;
