import axios from 'axios';

export default class ContactForm {
	constructor(form, options) {
		this.form = form;
		this.options = options;
		this.sending = false;

		this.handleFormResponse = this.handleFormResponse.bind(this);
	}

	submit() {
		if (this.sending) {
			return Promise.resolve();
		}

		this.clearErrors();
		return this.sendForm();
	}

	getFormId() {
		const formIdElem = this.getAllInputs().find(i => i.getAttribute('name') === '_wpcf7');

		if (!formIdElem) {
			throw new Error('Form ID not found.');
		}

		return formIdElem.value;
	}

	getFormData() {
		const formData = new window.FormData();
		this.getAllInputs().forEach(input => {
			formData.append(input.getAttribute('name'), input.value);
		});

		return formData;
	}

	sendForm() {
		const url = `https://tsg.d3applications.com/wp-json/contact-form-7/v1/contact-forms/${this.getFormId()}/feedback`;
		this.toggleSending(true);
		return axios({
			url,
			method: 'POST',
			data: this.getFormData()
		})
			.then(res => res.data)
			.then(res => {
				this.toggleSending(false);
				return res;
			})
			.then(this.handleFormResponse);
	}

	toggleSending(sending) {
		const submit = this.form.querySelector('input[type="submit"]');

		if (sending) {
			this.sending = sending;
			this.form.classList.add('sending');
			submit.setAttribute('disabled', 'disabled');
		} else {
			this.sending = sending;
			this.form.classList.remove('sending');
			submit.removeAttribute('disabled');
		}
	}

	handleFormResponse(data) {
		return new Promise((resolve, reject) => {
			const {invalidFields} = data;
			if (invalidFields) {
				return reject(this.showErrors(invalidFields));
			}

			this.clearErrors();
			this.clearInputs();

			return resolve(data);
		});
	}

	clearErrors() {
		const errors = Array.from(this.form.querySelectorAll('small.error'));

		errors.forEach(error => {
			error.parentNode.removeChild(error);
		});
	}

	clearInputs() {
		const inputs = this.getAllInputs();
		const formInputs = inputs.filter(input => {
			const parent = input.parentNode;

			return parent.classList.contains('wpcf7-form-control-wrap');
		});

		formInputs.forEach(input => {
			input.value = null;
		});
	}

	showErrors(invalidFields) {
		invalidFields.forEach(field => {
			const inputSpan = this.getInputSpan(field.into);

			const errorHtml = document.createElement('small');
			errorHtml.classList.add('error');
			errorHtml.innerHTML = field.message;

			inputSpan.appendChild(errorHtml);
		});
	}

	getAllInputs() {
		return Array.from(this.form.elements);
	}

	getInputSpan(spanClass) {
		return this.form.querySelector(spanClass);
	}
}
