import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired
	};

	render() {
		return <form onSubmit={this.handleSubmit}/>;
	}
}
