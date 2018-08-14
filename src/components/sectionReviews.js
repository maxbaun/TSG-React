import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';

import CSS from '../css/modules/sectionReviews.module.scss';
import Section from './section';
import SectionContent from './sectionContent';
import WindowSize from './windowSize';
import Button from './button';
import {ref, click} from '../utils/componentHelpers';
import {innerHtml, limitToWords, limitToCharacters} from '../utils/wordpressHelpers';

// eslint-disable-next-line react/no-deprecated
class SectionReviews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeSlide: 0,
			sectionActive: false,
			tallestSlide: 0
		};

		this.slider = null;
		this.swiper = null;

		this.updateSlider = this.updateSlider.bind(this);
		this.handleSlideChange = this.handleSlideChange.bind(this);
		this.handlePaginationClick = this.handlePaginationClick.bind(this);
	}

	static propTypes = {
		header: PropTypes.string,
		content: PropTypes.string,
		reviews: PropTypes.array,
		link: PropTypes.object,
		windowWidth: PropTypes.number.isRequired
	};

	static defaultProps = {
		header: null,
		content: null,
		reviews: [],
		link: {}
	};

	componentDidMount() {
		setTimeout(() => {
			this.updateSlider();
		}, 300);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.windowWidth !== this.props.windowWidth) {
			// Do something
		}
	}

	updateSlider() {
		const container = this.slider.querySelector('.swiper-container');
		const options = {
			centeredSlides: true,
			loop: true,
			direction: 'horizontal',
			slidesPerView: 2.75,
			spaceBetween: 75,
			slideToClickedSlide: true,
			slideActiveClass: CSS.slideActive,
			loopedSlides: 3,
			breakpoints: {
				768: {
					slidesPerView: 1.25,
					spaceBetween: 25
				},
				1200: {
					slidesPerView: 1.5,
					spaceBetween: 10
				}
			}
		};

		this.setState({
			sectionActive: true
		});

		this.swiper = new Swiper(container, options);
		this.swiper.on('slideChangeTransitionEnd', this.handleSlideChange);
	}

	handleSlideChange() {
		this.setState({
			activeSlide: this.swiper.realIndex
		});
	}

	handlePaginationClick(index) {
		this.swiper.slideToLoop(index);
	}

	render() {
		const {activeSlide, sectionActive} = this.state;
		const {reviews, link, header, content, windowWidth} = this.props;

		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section
				id="sectionReviews"
				slantDirection="rightToLeft"
				backgroundColor="#FCF5F9"
				angleHeight={75}
				spacingTop={windowWidth < 768 ? 39 : 81}
			>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<div className={CSS.sectionHeader}>
							<SectionContent
								content={{
									header,
									content
								}}
								contentContainerWidth={950}
								classname="sectionReviewsContent"
							/>
						</div>
					</div>
					<div ref={ref.call(this, 'slider')} className={CSS.slider}>
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{reviews.map(review => {
									const slideCss = ['swiper-slide', CSS.slide];

									return (
										<div key={`${review.title}+${review.excerpt}`} className={slideCss.join(' ')}>
											<div className={CSS.slideInner}>
												<div className={CSS.slideBody}>
													<div className={CSS.slideMain}>
														<div
															// eslint-disable-next-line react/no-danger
															dangerouslySetInnerHTML={innerHtml(limitToCharacters(review.content, 450))}
															className={CSS.slideContent}
														/>
														<div className={CSS.slideName}>
															{review.title} - {review.acf.location}
														</div>
													</div>
													<div className={CSS.slideFooter}>
														<ul className={CSS.slideStars}>
															<li>
																<span className="fa fa-star"/>
															</li>
															<li>
																<span className="fa fa-star"/>
															</li>
															<li>
																<span className="fa fa-star"/>
															</li>
															<li>
																<span className="fa fa-star"/>
															</li>
															<li>
																<span className="fa fa-star"/>
															</li>
														</ul>
														<div className={CSS.readMore}>
															<Button size="sm" to={review.url}>
																Read More
															</Button>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={CSS.sliderPagination}>
						<ul>
							{reviews.map((review, index) => {
								return (
									<li
										key={`${review.title}+${review.excerpt}`}
										className={index === activeSlide ? CSS.bulletActive : CSS.bullet}
										onClick={click(this.handlePaginationClick, index)}
									/>
								);
							})}
						</ul>
					</div>
					{link && link.url ? (
						<div className={CSS.reviewsCta}>
							<Button classname="secondary" to={link.url} style={{display: 'block', maxWidth: 300, margin: '0 auto'}}>
								{link.title}
							</Button>
						</div>
					) : null}
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionReviews);
