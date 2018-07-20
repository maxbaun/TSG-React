import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SectionContent from './sectionContent';
import CSS from '../css/modules/sectionComponents.module.scss';

export default class SectionComponents extends Component {
	static propTypes = {
		header: PropTypes.string,
		components: PropTypes.array
	};

	static defaultProps = {
		header: {},
		components: []
	};

	render() {
		const {header, components} = this.props;

		return (
			<section className={CSS.section}>
				<div className="container">
					<div className={CSS.sectionHeader}>
						<SectionContent
							content={{
								header
							}}
							contentContainerWidth={950}
							classname="sectionComponentsHeader"
						/>
					</div>
					<div className={CSS.sectionContent}>
						<ul className={CSS.components}>
							{components.map(component => {
								return (
									<li key={component.title}>
										<div className={CSS.component}>
											<h3 data-align={component.titleAlign}>{component.title}</h3>
											<p>{component.text}</p>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</section>
		);
	}
}
