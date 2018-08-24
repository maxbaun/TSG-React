import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../css/utils/forms.scss';

import CSS from '../css/modules/sectionForm.module.scss';
import SectionContent from './sectionContent';
import Loading from './loading';
import {innerHtml} from '../utils/wordpressHelpers';
import ContactForm from '../services/contactForm';
import {ref} from '../utils/componentHelpers';

export default class SectionForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			sending: false,
			message: null
		};

		this.wrap = null;
		this.form = null;
	}

	static propTypes = {
		content: PropTypes.object,
		form: PropTypes.string,
		contain: PropTypes.bool
	};

	static defaultProps = {
		content: {},
		form: '',
		contain: true
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			});
		}, 300);

		if (this.wrap) {
			const form = this.wrap.querySelector('form');

			if (form) {
				this.form = new ContactForm(form, {});
				this.form.form.addEventListener('submit', ::this.handleSubmit);
			}
		}
	}

	componentWillUnmount() {
		if (this.form && this.form.form) {
			this.form.form.removeEventListener('submit', ::this.handleSubmit);
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({
			sending: true,
			message: null
		});

		this.form
			.submit()
			.then(data => {
				this.setState({
					sending: false,
					message: data.message
				});
			})
			.catch(() => {
				this.setState({
					sending: false
				});
			});
	}

	render() {
		const {active, message, sending} = this.state;
		const {contain} = this.props;

		const sectionCss = [CSS.section];
		let contentCss = 'sectionForm';

		if (active) {
			sectionCss.push(CSS.sectionActive);
		}

		if (contain === false) {
			contentCss = 'sectionFormLeft';
		}

		return (
			<section className={sectionCss.join(' ')}>
				<div className={contain ? 'container' : ''}>
					<div ref={ref.call(this, 'wrap')} className={CSS.wrap}>
						<div className={CSS.content}>
							{sending ? (
								<div className={CSS.loader}>
									<Loading/>
								</div>
							) : null}
							<SectionContent content={this.props.content} classname={contentCss}/>
						</div>
						{message ? <p className={CSS.message}> {message} </p> : null}
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={innerHtml(this.props.form)} className={CSS.form}/>
					</div>
				</div>
			</section>
		);
	}
}
