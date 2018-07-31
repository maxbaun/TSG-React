import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import CSS from '../css/modules/sectionForm.module.scss';
import SectionContent from './sectionContent';
import ConnectAFriendForm from '../forms/connectAFriend';
import {innerHtml} from '../utils/wordpressHelpers';

export default class SectionForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};

		this.renderForm = this.renderForm.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	static propTypes = {
		content: PropTypes.object,
		form: PropTypes.string
	};

	static defaultProps = {
		content: {},
		form: ''
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			});
		}, 300);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		axios
			.post('https://formspree.io/max@d3applications.com', {
				message: 'test',
				_subject: 'Form Test',
				_replyto: 'boobs@gmail.com'
			})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		const {active} = this.state;

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push(CSS.sectionActive);
		}

		console.log(this.props.form);

		return (
			<section className={sectionCss.join(' ')}>
				<div className="container">
					<div className={CSS.wrap}>
						<div className={CSS.content}>
							<SectionContent content={this.props.content} classname="sectionForm"/>
						</div>
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={innerHtml(this.props.form)} className={CSS.form}/>
					</div>
				</div>
			</section>
		);
	}

	renderForm() {
		const {form} = this.props;

		if (form.form === 'connectAFriend') {
			return <ConnectAFriendForm/>;
		}

		return null;
	}
}
