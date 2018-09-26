import React from 'react';
import PropTypes from 'prop-types';
import graphql from 'graphql';
import moment from 'moment';
import qs from 'query-string';

import FlexibleContent from '../components/flexibleContent';
import Page from '../components/page';
import Button from '../components/button';
import Seo from '../components/seo';
import CSS from '../css/modules/availability.module.scss';
import {ref, getNextYears} from '../utils/componentHelpers';

export default class AvailabilityTemplate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			futureYears: getNextYears(),
			month: this.hasQueryPart('month') ?
				moment()
					.set('month', this.getQueryPart('month'))
					.format('M') :
				43,
			day: this.getQueryPart('day') || 43,
			year: this.getQueryPart('year') || 43
		};

		this.form = null;
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		site: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired
	};

	hasQueryPart(key) {
		return Boolean(this.getQueryPart(key));
	}

	getQueryPart(key) {
		const parts = qs.parse(this.props.location.search);

		if (!parts) {
			return;
		}

		return parts[key];
	}

	handleChange(key) {
		return e => {
			this.setState({[key]: e.target.value});
		};
	}

	handleSubmit(e) {
		const valid = window.submitIt(this.form);

		if (!valid) {
			return e.preventDefault();
		}
	}

	render() {
		const {currentPage} = this.props.data;

		return (
			<Page contain padding={false}>
				<Seo currentPage={currentPage} site={this.props.site} location={this.props.location}/>
				<div className={CSS.wrap}>
					<div className={CSS.content}>
						<FlexibleContent page={currentPage} formContain={false}/>
					</div>
					<div className={CSS.form}>
						<form
							ref={ref.call(this, 'form')}
							method="post"
							action="https://tsgtools.com/request_information.asp"
							onSubmit={this.handleSubmit}
							name="reqinfoform"
						>
							<div className="row">
								<div className="col-12 col-sm-6">
									<h3>Personal Info</h3>
									<ul>
										<li>
											<label htmlFor="first_name">* First Name</label>
											<input type="text" name="first_name" required/>
										</li>
										<li>
											<label htmlFor="last_name">* Last Name</label>
											<input type="text" name="last_name" required/>
										</li>
										<li>
											<label htmlFor="email">* Email</label>
											<input type="email" name="email" required/>
										</li>
										<li>
											<label htmlFor="address">* Address</label>
											<input type="text" name="address" required/>
										</li>
										<li>
											<label htmlFor="address2">Address Line 2</label>
											<input type="text" name="address2"/>
										</li>
										<li className="row">
											<div className="col-6">
												<label htmlFor="city">* City</label>
												<input type="text" name="city" required/>
											</div>
											<div className="col-6">
												<label htmlFor="state">* State</label>
												<select name="state" defaultValue="MA" required>
													<option value=""> select state or province </option>
													<option value="AL"> Alabama </option>
													<option value="AB"> Alberta </option>
													<option value="AK"> Alaska </option>
													<option value="AZ"> Arizona </option>
													<option value="AR"> Arkansas </option>
													<option value="BC"> British Columbia </option>
													<option value="CA"> California </option>
													<option value="CO"> Colorado </option>
													<option value="CT"> Connecticut </option>
													<option value="DE"> Delaware </option>
													<option value="FL"> Florida </option>
													<option value="GA"> Georgia </option>
													<option value="HI"> Hawaii </option>
													<option value="ID"> Idaho </option>
													<option value="IL"> Illinois </option>
													<option value="IN"> Indiana </option>
													<option value="IA"> Iowa </option>
													<option value="KS"> Kansas </option>
													<option value="KY"> Kentucky </option>
													<option value="LA"> Louisiana </option>
													<option value="ME"> Maine </option>
													<option value="MB"> Manitoba </option>
													<option value="MD"> Maryland </option>
													<option value="MA">Massachusetts</option>
													<option value="MI"> Michigan </option>
													<option value="MN"> Minnesota </option>
													<option value="MS"> Mississippi </option>
													<option value="MO"> Missouri </option>
													<option value="MT"> Montana </option>
													<option value="NE"> Nebraska </option>
													<option value="NV"> Nevada </option>
													<option value="NB"> New Brunswick </option>
													<option value="NH"> New Hampshire </option>
													<option value="NJ"> New Jersey </option>
													<option value="NM"> New Mexico </option>
													<option value="NY"> New York </option>
													<option value="NF"> Newfoundland </option>
													<option value="NC"> North Carolina </option>
													<option value="ND"> North Dakota </option>
													<option value="NT"> NW Territories/NVT </option>
													<option value="NS"> Nova Scotia </option>
													<option value="OH"> Ohio </option>
													<option value="OK"> Oklahoma </option>
													<option value="ON"> Ontario </option>
													<option value="OR"> Oregon </option>
													<option value="PA"> Pennsylvania </option>
													<option value="PE"> Prince Edward Island </option>
													<option value="QC"> Quebec </option>
													<option value="RI"> Rhode Island </option>
													<option value="SK"> Saskatchewan </option>
													<option value="SC"> South Carolina </option>
													<option value="SD"> South Dakota </option>
													<option value="TN"> Tennessee </option>
													<option value="TX"> Texas </option>
													<option value="UT"> Utah </option>
													<option value="VT"> Vermont </option>
													<option value="VA"> Virginia </option>
													<option value="WA"> Washington </option>
													<option value="DC"> Washington DC </option>
													<option value="WV"> West Virginia </option>
													<option value="WI"> Wisconsin </option>
													<option value="WY"> Wyoming </option>
													<option value="YT"> Yukon </option>
												</select>
											</div>
										</li>
										<li className="row">
											<div className="col-6">
												<label htmlFor="zipcode">* Zip Code</label>
												<input type="text" name="zipcode" required/>
											</div>
											<div className="col-6">
												<label htmlFor="question_1">* Phone</label>
												<input type="hidden" name="q1_mapto" value="cell_phone"/>
												<input type="text" name="question_1" size="30" maxlength="50"/>
											</div>
										</li>
										<li>
											<label htmlFor="req_source">* How did you hear about us?</label>
											<input type="text" name="req_source" required/>
										</li>
									</ul>
								</div>
								<div className="col-12 col-sm-6">
									<h3>Event Information</h3>
									<ul>
										<li className="row">
											<div className="col-4">
												<label htmlFor="month">Month</label>
												<select name="month" value={this.state.month} onChange={this.handleChange('month')}>
													<option value="43">Month</option>
													<option value="1">January </option>
													<option value="2">February </option>
													<option value="3">March </option>
													<option value="4">April </option>
													<option value="5">May </option>
													<option value="6">June </option>
													<option value="7">July </option>
													<option value="8">August </option>
													<option value="9">September </option>
													<option value="10">October </option>
													<option value="11">November </option>
													<option value="12">December </option>
												</select>
											</div>
											<div className="col-4">
												<label htmlFor="day">Day</label>
												<select name="day" value={this.state.day} onChange={this.handleChange('day')}>
													<option value="43">Day</option>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
													<option value="6">6</option>
													<option value="7">7</option>
													<option value="8">8</option>
													<option value="9">9</option>
													<option value="10">10</option>
													<option value="11">11</option>
													<option value="12">12</option>
													<option value="13">13</option>
													<option value="14">14</option>
													<option value="15">15</option>
													<option value="16">16</option>
													<option value="17">17</option>
													<option value="18">18</option>
													<option value="19">19</option>
													<option value="20">20</option>
													<option value="21">21</option>
													<option value="22">22</option>
													<option value="23">23</option>
													<option value="24">24</option>
													<option value="25">25</option>
													<option value="26">26</option>
													<option value="27">27</option>
													<option value="28">28</option>
													<option value="29">29</option>
													<option value="30">30</option>
													<option value="31">31</option>
												</select>
											</div>
											<div className="col-4">
												<label htmlFor="year">Year</label>
												<select name="year" value={this.state.year} onChange={this.handleChange('year')}>
													<option value="43">Year</option>
													{this.state.futureYears.map(year => {
														return (
															<option key={year} value={year}>
																{year}
															</option>
														);
													})}
												</select>
											</div>
										</li>
										<li className="row">
											<div className="col-6">
												<label htmlFor="req_start_time">Start Time</label>
												<select name="req_start_time" defaultValue="">
													<option value="">Start Time</option>
													<option value="12:00 pm">Noon</option>
													<option value="12:30 pm">12:30 pm</option>
													<option value="1:00 pm">1:00 pm</option>
													<option value="1:30 pm">1:30 pm</option>
													<option value="2:00 pm">2:00 pm</option>
													<option value="2:30 pm">2:30 pm</option>
													<option value="3:00 pm">3:00 pm</option>
													<option value="3:30 pm">3:30 pm</option>
													<option value="4:00 pm">4:00 pm</option>
													<option value="4:30 pm">4:30 pm</option>
													<option value="5:00 pm">5:00 pm</option>
													<option value="5:30 pm">5:30 pm</option>
													<option value="6:00 pm">6:00 pm</option>
													<option value="6:30 pm">6:30 pm</option>
													<option value="7:00 pm">7:00 pm</option>
													<option value="7:30 pm">7:30 pm</option>
													<option value="8:00 pm">8:00 pm</option>
													<option value="8:30 pm">8:30 pm</option>
													<option value="9:00 pm">9:00 pm</option>
													<option value="9:30 pm">9:30 pm</option>
													<option value="10:00 pm">10:00 pm</option>
													<option value="10:30 pm">10:30 pm</option>
													<option value="11:00 pm">11:00 pm</option>
													<option value="11:30 pm">11:30 pm</option>
													<option value="12:00 am">Midnight</option>
													<option value="12:30 am">12:30 am</option>
													<option value="1:00 am">1:00 am</option>
													<option value="1:30 am">1:30 am</option>
													<option value="2:00 am">2:00 am</option>
													<option value="2:30 am">2:30 am</option>
													<option value="3:00 am">3:00 am</option>
													<option value="3:30 am">3:30 am</option>
													<option value="4:00 am">4:00 am</option>
													<option value="4:30 am">4:30 am</option>
													<option value="5:00 am">5:00 am</option>
													<option value="5:30 am">5:30 am</option>
													<option value="6:00 am">6:00 am</option>
													<option value="6:30 am">6:30 am</option>
													<option value="7:00 am">7:00 am</option>
													<option value="7:30 am">7:30 am</option>
													<option value="8:00 am">8:00 am</option>
													<option value="8:30 am">8:30 am</option>
													<option value="9:00 am">9:00 am</option>
													<option value="9:30 am">9:30 am</option>
													<option value="10:00 am">10:00 am</option>
													<option value="10:30 am">10:30 am</option>
													<option value="11:00 am">11:00 am</option>
													<option value="11:30 am">11:30 am</option>
												</select>
											</div>
											<div className="col-6">
												<label htmlFor="req_end_time">End Time</label>
												<select name="req_end_time" defaultValue="">
													<option value="">End Time</option>
													<option value="12:00 pm">Noon</option>
													<option value="12:30 pm">12:30 pm</option>
													<option value="1:00 pm">1:00 pm</option>
													<option value="1:30 pm">1:30 pm</option>
													<option value="2:00 pm">2:00 pm</option>
													<option value="2:30 pm">2:30 pm</option>
													<option value="3:00 pm">3:00 pm</option>
													<option value="3:30 pm">3:30 pm</option>
													<option value="4:00 pm">4:00 pm</option>
													<option value="4:30 pm">4:30 pm</option>
													<option value="5:00 pm">5:00 pm</option>
													<option value="5:30 pm">5:30 pm</option>
													<option value="6:00 pm">6:00 pm</option>
													<option value="6:30 pm">6:30 pm</option>
													<option value="7:00 pm">7:00 pm</option>
													<option value="7:30 pm">7:30 pm</option>
													<option value="8:00 pm">8:00 pm</option>
													<option value="8:30 pm">8:30 pm</option>
													<option value="9:00 pm">9:00 pm</option>
													<option value="9:30 pm">9:30 pm</option>
													<option value="10:00 pm">10:00 pm</option>
													<option value="10:30 pm">10:30 pm</option>
													<option value="11:00 pm">11:00 pm</option>
													<option value="11:30 pm">11:30 pm</option>
													<option value="12:00 am">Midnight</option>
													<option value="12:30 am">12:30 am</option>
													<option value="1:00 am">1:00 am</option>
													<option value="1:30 am">1:30 am</option>
													<option value="2:00 am">2:00 am</option>
													<option value="2:30 am">2:30 am</option>
													<option value="3:00 am">3:00 am</option>
													<option value="3:30 am">3:30 am</option>
													<option value="4:00 am">4:00 am</option>
													<option value="4:30 am">4:30 am</option>
													<option value="5:00 am">5:00 am</option>
													<option value="5:30 am">5:30 am</option>
													<option value="6:00 am">6:00 am</option>
													<option value="6:30 am">6:30 am</option>
													<option value="7:00 am">7:00 am</option>
													<option value="7:30 am">7:30 am</option>
													<option value="8:00 am">8:00 am</option>
													<option value="8:30 am">8:30 am</option>
													<option value="9:00 am">9:00 am</option>
													<option value="9:30 am">9:30 am</option>
													<option value="10:00 am">10:00 am</option>
													<option value="10:30 am">10:30 am</option>
													<option value="11:00 am">11:00 am</option>
													<option value="11:30 am">11:30 am</option>
												</select>
											</div>
										</li>
										<li className="row">
											<div className="col-12">
												<label htmlFor="event_type">Event Type:</label>
												<select name="event_type">
													<option value="">Event Type</option>
													<option>Wedding</option>
													<option>Corporate Event</option>
													<option>Charity / Non-Profit</option>
													<option>Lighting Design</option>
													<option>Photo Booth Rental</option>
													<option>Other</option>
												</select>
											</div>
										</li>
										<li className="row">
											<div className="col-6">
												<label htmlFor="event_location_id">Event Venue</label>
												<select name="event_location_id">
													<option value="0">Event Venue</option>
													<option value="5">Adams Inn - Quincy, MA</option>
													<option value="6">Alden Castle - Brookline, MA</option>
													<option value="281">Aldrich Mansion - Warwick, RI</option>
													<option value="7">Andolini's Restaurant - Andover, MA</option>
													<option value="295">Andover Country Club - Andover, MA</option>
													<option value="9">Andover Inn - Andover, MA</option>
													<option value="296">Angelica's - Middleton, MA</option>
													<option value="11">Annisquam Yacht Club - Gloucester, MA</option>
													<option value="2">Aqua Turf Club - Palantsville, CT</option>
													<option value="12">Arlington Town Hall Auditorium - Arlington, MA</option>
													<option value="297">Atkinson Resort &amp;Country Club - Atkinson, NH</option>
													<option value="282">Atlantic Beach Club - Newport, RI</option>
													<option value="13">Atlantica - Cohasset, MA</option>
													<option value="14">Bancroft Hall - Cohasset, MA</option>
													<option value="15">Barn at Gibbet Hill - Groton, MA</option>
													<option value="298">Bass Rocks Golf Club - Gloucester, MA</option>
													<option value="227">Bedford Village Inn - Bedford, NH</option>
													<option value="299">Belle Mer - Newport, RI</option>
													<option value="300">Best Western Marlboro - Marlborough, MA</option>
													<option value="301">Beverly Golf and Tennis Club - Beverly, MA</option>
													<option value="302">Black Rock Country Club - Hingham, MA</option>
													<option value="303">Black Swan Country Club - Georgetown, MA</option>
													<option value="304">Blue Hill Country Club - Canton, MA</option>
													<option value="17">Boston College Club - Boston, MA</option>
													<option value="305">Boston Harbor Hotel - Boston, MA</option>
													<option value="18">Boston Harvard Club - Boston, MA</option>
													<option value="306">Boston Marriot Burlington - Burlington, MA</option>
													<option value="307">Boston Marriot Cambridge - Cambridge, MA</option>
													<option value="308">Boston Marriot Longwharf - Boston, MA</option>
													<option value="309">Boston Marriot Peabody Hotel - Peabody, MA</option>
													<option value="310">Boston Marriot Quincy - Quincy, MA</option>
													<option value="19">Boston Marriott Copley Square - Boston, MA</option>
													<option value="20">Boxborough Holiday Inn - Boxborough, MA</option>
													<option value="21">Bradford Country Club - North Andover, MA</option>
													<option value="311">Bradley Estate - Canton, MA</option>
													<option value="229">Brookstone Park - Derry, NH</option>
													<option value="312">Butternut Farm Golf Club - Stow, MA</option>
													<option value="24">Café Escadrille - Burlington, MA</option>
													<option value="313">Castle Hill on the Crane Estate - Ipswich, MA</option>
													<option value="231">Castle in the Clouds - Moultonborough, NH</option>
													<option value="314">Castle Manor Inn - Gloucester, MA</option>
													<option value="315">Castleton Banquet &amp;Conference Center - Windham, NH</option>
													<option value="316">Charter Oak Country Club - Hudson, MA</option>
													<option value="232">Church Landing - Meredith, NH</option>
													<option value="317">Colonial Hall at Rockafellas - Salem, MA</option>
													<option value="27">Colonial Hotel Gardner - Gardner, MA</option>
													<option value="28">Colonnade Hotel - Boston, MA</option>
													<option value="29">Commanders Mansion - Watertown, MA</option>
													<option value="318">Copley Fairmont Hotel - Boston, MA</option>
													<option value="234">Cottage Park at Squam Lake - Holderness, NH</option>
													<option value="235">Crowne Plaza Hotel - Nashua, NH</option>
													<option value="319">Cruiseport Gloucester - Gloucester, MA</option>
													<option value="285">Crystal Lake - Mapleville, RI</option>
													<option value="320">Cyprian Keyes Golf Club - Boylston, MA</option>
													<option value="321">Danversport Yacht Club - Danvers, MA</option>
													<option value="322">DiBurros - Haverhill, MA</option>
													<option value="216">Dockside - York, ME</option>
													<option value="323">Doubletree by Hilton Bedford Glen - Bedford, MA</option>
													<option value="324">Doubletree by Hilton Boston North Shore - Danvers, MA</option>
													<option value="325">Eastern Point Yacht Club - Gloucester, MA</option>
													<option value="34">Elks at Bass Rocks - Gloucester, MA</option>
													<option value="35">Elm Bank Wellesley - Wellesley, MA</option>
													<option value="36">Exchange Conference Center - Boston, MA</option>
													<option value="236">Exeter Inn - Exeter, NH</option>
													<option value="326">Fairmont Battery Wharf - Boston, MA</option>
													<option value="38">Fairmont Copley Plaza - Boston, MA</option>
													<option value="327">Fairways at Woburn Country Club - Woburn, MA</option>
													<option value="280">Fishers Island Club - Fishers Island, NY</option>
													<option value="237">Flag Hill Winery - Lee, NH</option>
													<option value="39">Fruitlands Museum - Harvard, MA</option>
													<option value="40">Gillette Stadium - Foxboro, MA</option>
													<option value="328">Glen Magna Farms - Danvers, MA</option>
													<option value="287">Glen Manor House - Portsmouth, RI</option>
													<option value="329">Granite Links Golf Club - Quincy, MA</option>
													<option value="239">Granite Rose - Hampstead, NH</option>
													<option value="330">Groveland Fairways - Groveland, MA</option>
													<option value="44">Hamilton Hall - Salem, MA</option>
													<option value="240">Harbor Event Center - Portsmouth, NH</option>
													<option value="331">Hard Rock Café - Boston, MA</option>
													<option value="241">Harris Pelham Inn - Pelham, NH</option>
													<option value="332">Haverhill Country Club - Haverhill, MA</option>
													<option value="333">Hawthorne Hotel on the Common - Salem, MA</option>
													<option value="47">Hellenic Center - Ipswich, MA</option>
													<option value="334">Hilton at Logan Airport - Boston, MA</option>
													<option value="48">Holiday Inn Beacon Hill - Boston, MA</option>
													<option value="49">Holy Ghost Society, Peabody - Peabody, MA</option>
													<option value="335">Hotel Marlowe - Cambridge, MA</option>
													<option value="288">Hotel Viking - Newport, RI</option>
													<option value="336">Hyatt Harborside - Boston, MA</option>
													<option value="289">Hyatt Regency - Newport, RI</option>
													<option value="337">Indian Pond Country Club - Kingston, MA</option>
													<option value="53">Indian Ridge Country Club - Andover, MA</option>
													<option value="242">Inn &amp;Spa at Mill Falls - Meredith, NH</option>
													<option value="54">Intercontinental Hotel - Boston, MA</option>
													<option value="338">Ipswich Country Club - Ipswich, MA</option>
													<option value="244">Kimball Jenkins Estate - Concord, NH</option>
													<option value="290">Kinney Bungalow - Narragansett, RI</option>
													<option value="245">Labelle Winery - Amherst, NH</option>
													<option value="339">Lake Pearl Luciano's - Wrentham, MA</option>
													<option value="340">Lakeview Pavilion - Foxboro, MA</option>
													<option value="341">L'Andana - Burlington, MA</option>
													<option value="59">Langham Hotel - Boston, MA</option>
													<option value="60">Lantana's - Randolph, MA</option>
													<option value="342">Larz Anderson Auto Museum - Brookline, MA</option>
													<option value="61">Le Meredien - Cambridge, MA</option>
													<option value="62">Leicester Country Club - Leicester, MA</option>
													<option value="343">Lenox Hotel - Boston, MA</option>
													<option value="64">Liberty Hotel - Boston, MA</option>
													<option value="65">Lombardo's - Randolph, MA</option>
													<option value="246">Longlook Farm - Sanbornton, NH</option>
													<option value="344">Lyman Estate - Waltham, MA</option>
													<option value="345">Mechanics Hall - Worcester, MA</option>
													<option value="70">Millennium Hotel - Boston, MA</option>
													<option value="346">Millennium Hotel Boston - Boston, MA</option>
													<option value="72">Mission Oak Grill - Newburyport, MA</option>
													<option value="347">Misslewood - Beverly, MA</option>
													<option value="73">Montvale Plaza - Stoneham, MA</option>
													<option value="348">Moraine Farm - Beverly, MA</option>
													<option value="247">Mountain View Grand - Whitefield, NH</option>
													<option value="349">Museum of Science - Boston, MA</option>
													<option value="76">Nahant Country Club - Nahant, MA</option>
													<option value="77">Nantasket Beach Resort - Hull, MA</option>
													<option value="350">Nashua Country Club - Nashua, NH</option>
													<option value="78">New Bedford Whaling Museum - New Bedford, MA</option>
													<option value="351">New England Aquarium - Boston, MA</option>
													<option value="352">North Andover Country Club - North Andover, MA</option>
													<option value="82">Oakley Country Club - Watertown/Belmont, MA</option>
													<option value="83">Ocean Edge Resort - Brewster, MA</option>
													<option value="249">Ocean View Inn &amp;Resort - Gloucester, NH</option>
													<option value="293">OceanCliff Newport - Newport, RI</option>
													<option value="250">Odiorne Point State Park - Rye, NH</option>
													<option value="84">Old Sturbridge Village - Sturbridge, MA</option>
													<option value="251">Omni Mt. Washington Resort - Bretton Woods, NH</option>
													<option value="353">Omni Parker House - Boston, MA</option>
													<option value="218">On The Marsh - Kennenbunk, ME</option>
													<option value="252">Our Farm - Durham, NH</option>
													<option value="87">Pamet harbor Yacht Club - Truro, MA</option>
													<option value="88">Park Plaza Boston - Boston, MA</option>
													<option value="354">Peabody Essex Museum - Salem, MA</option>
													<option value="90">Peabody Marriott - Peabody, MA</option>
													<option value="253">Pellham Inn - Pellham, NH</option>
													<option value="254">Phillips Exeter Academy - Exeter, NH</option>
													<option value="91">Piety Corner Club - Waltham, MA</option>
													<option value="92">Pine Hill Pavilion - Plymouth, MA</option>
													<option value="93">Pine Ridge - Oxford, MA</option>
													<option value="94">Pluming Museum - Watertown, MA</option>
													<option value="255">Portsmouth Harbor Events and Conference Center - Portsmouth, NH</option>
													<option value="95">Princeton Station - North Chelmsford, MA</option>
													<option value="355">Promises to Keep - Derry, NH</option>
													<option value="294">Providence Biltmore - Providence, RI</option>
													<option value="279">Publick House - Sturbridge, NJ</option>
													<option value="257">Radison Nashua - Nashua, NH</option>
													<option value="96">Rafael's - Walpole, MA</option>
													<option value="219">Red Barn at Outlook Farm - South Berwick, ME</option>
													<option value="258">Red Jacket Resort - North Conway, NH</option>
													<option value="97">Red Lion Inn - Cohassett, MA</option>
													<option value="98">Renaissance Boston Patriot Place - Foxboro, MA</option>
													<option value="99">Renaissance Golf Club - Haverhill, MA</option>
													<option value="356">Reneissance Boston Waterfront Hotel - Boston, MA</option>
													<option value="101">Restaurant Dante - Watertown, MA</option>
													<option value="103">Ritz Boston Common - Boston, MA</option>
													<option value="259">River Mill at Dover Landing - Dover, NH</option>
													<option value="104">River Mill Dover Landing - Dover, MA</option>
													<option value="3">Riverside Knights Banquet Hall - North Grosvenordale, CT</option>
													<option value="105">Robert Trent Paine Estate - Waltham, MA</option>
													<option value="106">Rockport Art Association - Rockport, MA</option>
													<option value="107">Rockport Country Club - Rockport, MA</option>
													<option value="108">Royal Sonesta Cambridge - Cambridge, MA</option>
													<option value="357">Royal Sonesta Hotel - Cambridge, MA</option>
													<option value="263">Rye Harbor State Park - Rye, NH</option>
													<option value="109">Salem Country Club - Peabody, MA</option>
													<option value="358">Salem Waterfront Hotel - Salem, MA</option>
													<option value="111">Salvatores - Lawerence, MA</option>
													<option value="112">Sankaty Head Golf Club - Nantucket, MA</option>
													<option value="359">Saphire Estate (Saphire Event Group) - Sharon, MA</option>
													<option value="264">Seacoast Science Center - Rye, NH</option>
													<option value="360">Seaport World Trade Center &amp;Hotel - Boston, MA</option>
													<option value="361">Searles Castle at Windham - Windham, NH</option>
													<option value="220">Sebasco Harbor Resort - Phippsburg Maine, ME</option>
													<option value="222">Senator Inn &amp;Spa - Augusta ME - Augusta, ME</option>
													<option value="265">Shattuck Golf Course - Jaffrey, NH</option>
													<option value="117">Shaws Center - Brockton, MA</option>
													<option value="362">Sheraton Commander Hotel - Cambridge, MA</option>
													<option value="363">Sheraton Framingham Hotel - Framingham, MA</option>
													<option value="364">Sheraton Needham Hotel - Needham, MA</option>
													<option value="365">Sheraton Norwood Hotel - Norwood, MA</option>
													<option value="119">Sherry Zide - Cabridge, MA</option>
													<option value="366">Sky Meadow Country Club - Nashua, NH</option>
													<option value="120">Smith and Wollensky-Back Bay - Boston, MA</option>
													<option value="121">Smith Barn - Peabody, MA</option>
													<option value="122">Smolak Farms - North Andover, MA</option>
													<option value="123">Sons of Italy - Woburn, MA</option>
													<option value="367">Speneli's - Boston, MA</option>
													<option value="124">Spinellis Lynnfield - Lynnfield, MA</option>
													<option value="368">Spring Valley Country Club - Sharon, MA</option>
													<option value="126">State Room - Boston, MA</option>
													<option value="127">Steeple Hall - Newburyport, MA</option>
													<option value="369">Stevens' Estate - North Andover, MA</option>
													<option value="129">Stonehedge Inn - Tyngsboro, MA</option>
													<option value="130">Stonehurst Estate - Waltham, MA</option>
													<option value="267">Stonehurst Manor - North Conway, NH</option>
													<option value="131">Stonhedge Inn &amp;Spa - Tynsgboro, MA</option>
													<option value="132">Stow Acres - Stow, MA</option>
													<option value="133">Strega Prime - Woburn, MA</option>
													<option value="134">Sturbridge Host Hotel - Sturbridge, MA</option>
													<option value="268">Sunny Slope Farm - Alton, NH</option>
													<option value="370">Taj Boston - Boston, MA</option>
													<option value="136">Temple Shir Tikvah - Winchester, MA</option>
													<option value="139">Tewksbury Knights of Columbus - Tewksbury, MA</option>
													<option value="371">Tewskbury Country Club - Tewksbury, MA</option>
													<option value="140">The Adams Inn - Quincy, MA</option>
													<option value="141">The Atlantica - Cohasset, MA</option>
													<option value="142">The Barn at Gibbett Hill - Groton, MA</option>
													<option value="372">The Boston Public Library - Boston, MA</option>
													<option value="143">The Bradley Estate - Canton, MA</option>
													<option value="373">The Charles Hotel - Cambridge, MA</option>
													<option value="144">The Chateau - Norton, MA</option>
													<option value="374">The Colonnade Hotel - Boston, MA</option>
													<option value="375">The Commons 1854 - Topsfield, MA</option>
													<option value="147">The Connors Estate - Dover, MA</option>
													<option value="148">The Corsair &amp;Cross Rip - Dennisport, MA</option>
													<option value="376">The Crowne Plaza Nashua - Nashua, NH</option>
													<option value="149">The Essex Room, Woodmans - Essex, MA</option>
													<option value="150">The Estate at Moraine Farm - Beverly, MA</option>
													<option value="377">The Exchange Conference Center - Boston, MA</option>
													<option value="378">The Fireside Grille - Middleboro, MA</option>
													<option value="379">The Four Seasons - Boston, MA</option>
													<option value="151">The Gloucester House - Gloucester, MA</option>
													<option value="152">The Habitat - Belmont, MA</option>
													<option value="380">The Langham, Boston - Boston, MA</option>
													<option value="269">The Mile Away - Milford, NH</option>
													<option value="155">The Pierce House - Lincoln, MA</option>
													<option value="156">The Publick House Inn - Sturbridge, MA</option>
													<option value="157">The Renaissance - Foxboro, MA</option>
													<option value="158">The River Club - Scituate, MA, MA</option>
													<option value="159">The Seaview - Dennisport, MA</option>
													<option value="160">The State Room - Boston, MA</option>
													<option value="271">The Summit Resort - Laconia, NH</option>
													<option value="161">The Villa - East Bridgewater, MA</option>
													<option value="162">Theodore Carmone - Foxboro, MA</option>
													<option value="163">Thompson Island - Boston, MA</option>
													<option value="164">Tirrell Room - Quincy, MA</option>
													<option value="165">Top of the Hub - Boston, MA</option>
													<option value="166">Tower Hill Botanic Garden - Boylston, MA</option>
													<option value="81">Truro Vineyard - Truro, MA</option>
													<option value="167">Trustee Room at Boston University - Boston, MA</option>
													<option value="381">Tupper Manor - Beverly, MA</option>
													<option value="382">Turner Hill Estate - Ipswich, MA</option>
													<option value="173">UMass Club - Boston, MA</option>
													<option value="223">Union Bluff Hotel - York, ME</option>
													<option value="383">Venezia Waterfront Banquet Facility &amp;Restaurant - Boston, MA</option>
													<option value="175">Vesper Country Club - Tyngsborough, MA</option>
													<option value="224">View Point - York, ME</option>
													<option value="176">Wachusett Country Club - West Boylston, MA</option>
													<option value="177">Wachusett Mountian - Princeton, MA</option>
													<option value="178">Wachusett Village Inn - Westminster, MA</option>
													<option value="179">Wang Theatre - Boston, MA</option>
													<option value="180">Warren Center - Ashland, MA</option>
													<option value="384">Warren Conference Center - Ashland, MA</option>
													<option value="182">Water Fresh Farm - Hopkinton, MA</option>
													<option value="183">Wedding - Not Entered, MA</option>
													<option value="385">Wedgewood Pines Country Club - Stow, MA</option>
													<option value="188">Wellesley College Club - Wellesley, MA</option>
													<option value="272">Wentworth by the Sea - New Castle, NH</option>
													<option value="190">Wequassett - Harwich Cape Cod, MA</option>
													<option value="191">Wequassett Resort Chatham MA - Chatham, MA</option>
													<option value="192">Westin Copley Place - Boston, MA</option>
													<option value="193">White Cliffs - Plymouth, MA</option>
													<option value="274">White Mountain Resort - North Conway, NH</option>
													<option value="275">Whitney's Inn - Jackson, NH</option>
													<option value="276">Wildcat Mountain Resort - Pinkham Notch, NH</option>
													<option value="196">Willowbend Country Club - Mashpee, MA</option>
													<option value="386">Willowdale Estate - Topsfield, MA</option>
													<option value="198">Woburn Country Club - Woburn, MA</option>
													<option value="200">Woburn Elks Hall - Woburn, MA</option>
													<option value="278">Wolfeboro Inn - Wolfeboro, NH</option>
													<option value="202">Worcester Airport - Worcester, MA</option>
													<option value="204">Wyndham Boston Andover - Andover, MA</option>
													<option value="225">York Golf and Tennis Club - York, ME</option>
													<option value="387">Zorvino Vineyards - Sandown, NH</option>
													<option value="210">Zukas Hilltop Barn - Spencer, MA</option>
												</select>
											</div>
											<div className="col-6">
												<label htmlFor="event_location_name">Event Venue (if not listed)</label>
												<input type="text" name="event_location_name"/>
											</div>
										</li>
										<li>
											<label htmlFor="additional_information">Additional Information</label>
											<textarea name="additional_information" cols="25" rows="5"/>
										</li>
										<li>
											<label htmlFor="question_2">Approx Guest Count</label>
											<input type="text" name="question_2"/>
										</li>
										<li>
											<label htmlFor="services">Are you interested in:</label>
											<div className="row">
												<div className="col-6">
													<label className="checkbox">
														<input type="checkbox" name="question_3" value="DJ Services"/>
														<span>DJ Services</span>
													</label>
													<label className="checkbox">
														<input type="checkbox" name="question_3" value="Ceremony Sound"/>
														<span>Ceremony Sound</span>
													</label>
													<label className="checkbox">
														<input type="checkbox" name="question_3" value="Lighting"/>
														<span>Lighting</span>
													</label>
												</div>
												<div className="col-6">
													<label className="checkbox">
														<input type="checkbox" name="question_3" value="Videography"/>
														<span>Videography</span>
													</label>
													<label className="checkbox">
														<input type="checkbox" name="question_3" value="Photo Booth"/>
														<span>Photo Booth</span>
													</label>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<input type="hidden" name="checkdate" id="" value=""/>
									<input name="djidnumber" type="hidden" value="10246"/>
									<input name="action" type="hidden" value="add_information_request"/>
									<input name="source" type="hidden" value=""/>
									<Button
										type="submit"
										style={{
											display: 'block',
											width: 468,
											maxWidth: '100%',
											margin: '20px auto 0'
										}}
									>
										Submit
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Page>
		);
	}
}

import {Page as pageFragment} from '../utils/fragments'; // eslint-disable-line no-unused-vars

export const availabilityQuery = graphql`
	query availabilityQuery($id: String!) {
		currentPage: wordpressPage(id: {eq: $id}) {
			...Page
		}
	}
`;
