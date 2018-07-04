import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionCta.module.scss';
import WindowSize from './windowSize';
import Section from './section';
import SectionContent from './sectionContent';
import Button from './button';

// eslint-disable-next-line react/no-deprecated
class SectionCta extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};
	}

	static propTypes = {
		windowWidth: PropTypes.number
	};

	static defaultProps = {
		windowWidth: PropTypes.number
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				sectionActive: true
			});
		}, 300);
	}

	render() {
		const {sectionActive} = this.state;
		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section id="sectionBios" slantDirection="leftToRight" backgroundColor="#FFF" angleHeight={0}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<ul className={CSS.boxes}>
							<li className={CSS.box}>
								<div className={CSS.boxInner}>
									<div className={CSS.boxContent}>
										<SectionContent
											content={{
												header: `<h2>Let's <strong>Talk</strong></h2>`,
												content: `<p>Let's meet so we can hear about your wedding day & answer any questions you have. Phone, email, & skype are okay too!</p>`
											}}
											contentContainerWidth={448}
											classname="sectionCtaContent"
										/>
									</div>
									<Button
										classname="secondary"
										to="#"
										style={{
											display: 'block',
											maxWidth: 304,
											margin: '0 auto'
										}}
									>
										Schedule A Meeting
									</Button>
								</div>
							</li>
							<li className={CSS.box}>
								<div className={CSS.boxInner}>
									<div className={CSS.boxContent}>
										<SectionContent
											content={{
												header: `<h2>Check Pricing &<br/><strong>Availability</strong></h2>`,
												content: `<p>Let's find out which one of our amazing entertainers are available on your wedding day. It's never to early to start planning!</p>`
											}}
											contentContainerWidth={448}
											classname="sectionCtaContent"
										/>
									</div>
									<Button
										classname="secondary"
										to="#"
										style={{
											display: 'block',
											maxWidth: 304,
											margin: '0 auto'
										}}
									>
										Check Availability
									</Button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionCta);
