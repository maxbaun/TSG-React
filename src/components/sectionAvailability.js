import React, {Component} from 'react';
import moment from 'moment';
import qs from 'query-string';

import BgImage from '../img/availabilityBg.jpg';
import Dropdown from './dropdown';
import Button from './button';
import CSS from '../css/modules/sectionAvailability.module.scss';
import {getNextYears, intToArray, noop} from '../utils/componentHelpers';
import '../css/utils/calendar.scss';

export default class SecitonAvailability extends Component {
	constructor(props) {
		super(props);

		this.state = {
			eventDate: moment(),
			futureYears: getNextYears(),
			modalOpen: false,
			month: null,
			date: null,
			year: null
		};

		this.handleModalToggle = this.handleModalToggle.bind(this);
		this.handleDatePartChange = this.handleDatePartChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	isComplete() {
		return this.state.month && this.state.date && this.state.year;
	}

	handleDatePartChange(key) {
		return value => {
			return this.setState(prevState => {
				return {
					...prevState,
					eventDate: prevState.eventDate.set(key, value),
					[key]: value
				};
			}, () => (this.isComplete() ? this.handleSubmit() : noop()));
		};
	}

	handleModalToggle(modalOpen) {
		this.setState({modalOpen});
	}

	handleSubmit() {
		const queryParams = {
			month: this.state.month,
			day: this.state.date,
			year: this.state.year
		};
		window.location = `/check-availability?${qs.stringify(queryParams)}`;
	}

	render() {
		const {eventDate} = this.state;

		return (
			<section className={CSS.section}>
				<div className={CSS.sectionBackground}>
					<img src={BgImage}/>
				</div>
				<div className="container">
					<div className={CSS.header}>
						<h2>
							Are Our DJs Available <br/>
							<strong>On Your Date?</strong>
						</h2>
						<h4>
							Choose your event date to get an instant reply <br/> with more
							information about our services.
						</h4>
					</div>
					<div className={CSS.checker}>
						<ul>
							<li>
								<Dropdown
									label="Month"
									value={this.state.month}
									options={moment.months()}
									onChange={this.handleDatePartChange('month')}
								/>
							</li>
							<li>
								<Dropdown
									label="Day"
									value={this.state.date}
									options={intToArray(eventDate.daysInMonth())}
									onChange={this.handleDatePartChange('date')}
								/>
							</li>
							<li>
								<Dropdown
									label="Year"
									value={this.state.year}
									options={this.state.futureYears}
									onChange={this.handleDatePartChange('year')}
								/>
							</li>
						</ul>
						<div className={CSS.checkerBtn}>
							<Button onClick={this.handleSubmit}>Check Now</Button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
