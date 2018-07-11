import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionFacts.module.scss';
import Section from './section';
import SectionContent from './sectionContent';
import Button from './button';

export default class SectionFacts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};
	}

	static propTypes = {
		title: PropTypes.string,
		facts: PropTypes.array,
		link: PropTypes.object
	};

	static defaultProps = {
		title: null,
		facts: [],
		link: null
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
			<Section id="sectionFacts" slantTop={false} slantBottom={false} angleHeight={0}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<SectionContent
							classname="sectionFacts"
							content={{
								header: this.props.title
							}}
						/>
						<div className={CSS.facts}>
							<ul>
								{this.props.facts &&
									this.props.facts.map(fact => {
										return (
											<li key={fact.text}>
												<div className={CSS.fact}>
													<span className={`icon icon-${fact.icon}`}/>
													<p>{fact.text}</p>
												</div>
											</li>
										);
									})}
							</ul>
						</div>
						{this.props.link ? (
							<div className={CSS.link}>
								<Button classname="secondary-white" to={this.props.link.url}>
									{this.props.link.title}
								</Button>
							</div>
						) : null}
					</div>
				</div>
			</Section>
		);
	}
}
