import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/sectionBios.module.scss';
import WindowSize from './windowSize';
import Section from './section';
import SectionContent from './sectionContent';

class SectionBios extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sectionActive: false
		};
	}

	static propTypes = {
		header: PropTypes.string,
		content: PropTypes.string
	};

	static defaultProps = {
		header: null,
		content: null
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
		const {header, content} = this.props;
		const sectionCss = [CSS.section];

		if (sectionActive) {
			sectionCss.push(CSS.sectionActive);
		}

		return (
			<Section id="sectionBios" slantDirection="leftToRight" backgroundColor="#FFF" angleHeight={0}>
				<div className={sectionCss.join(' ')}>
					<div className="container">
						<div className={CSS.sectionHeader}>
							<SectionContent content={{header, content}} classname="sectionBiosContent" contentContainerWidth={950}/>
						</div>
					</div>
				</div>
			</Section>
		);
	}
}

export default WindowSize(SectionBios);
