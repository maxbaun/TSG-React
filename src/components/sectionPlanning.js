import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionPlanning.module.scss';
import {innerHtml} from '../utils/wordpressHelpers';
import Image from './image';
import Link from './link';
import SectionContent from './sectionContent';

export default class SectionPlanning extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	static propTypes = {
		help: PropTypes.string,
		tools: PropTypes.array,
		header: PropTypes.object
	};

	static defaultProps = {
		help: '',
		tools: [],
		header: {}
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			});
		}, 300);
	}

	render() {
		const {active} = this.state;

		const sectionCss = [CSS.section];

		if (active) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<section className={sectionCss.join(' ')}>
				<div className="container">
					<div className={CSS.wrap}>
						<div className={CSS.header}>
							<SectionContent content={this.props.header} classname="sectionPlanning"/>
						</div>
						<div className={CSS.tools}>
							<ul>
								{this.props.tools.map(tool => {
									console.log(tool.link);

									return (
										<li key={tool.title}>
											<div className={CSS.tool}>
												<div className={CSS.toolImage}>
													<Link to={tool.link}>
														<Image image={tool.image}/>
													</Link>
												</div>
												<div className={CSS.toolContent}>
													<Link to={tool.link}>
														<h4>{tool.title}</h4>
													</Link>
													{/* eslint-disable-next-line react/no-danger */}
													<div dangerouslySetInnerHTML={innerHtml(tool.text)} className={CSS.toolText}/>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						{/* eslint-disable-next-line react/no-danger */}
						<div dangerouslySetInnerHTML={innerHtml(this.props.help)} className={CSS.help}/>
					</div>
				</div>
			</section>
		);
	}
}
