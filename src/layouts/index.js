import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class DefaultLayout extends Component {
	static propTypes = {
		children: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired
	}

	render() {
		console.log('here');
		return (
			<div id="app">
				<main className="main">
					{this.props.children()}
				</main>
			</div>
		);
	}
}
