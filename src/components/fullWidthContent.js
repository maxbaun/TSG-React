import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/fullWidthContent.module.scss';
import SectionContent from './sectionContent';

export default class FullWidthContent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	static propTypes = {
		content: PropTypes.object.isRequired,
		maxWidth: PropTypes.number
	};

	static defaultProps = {
		maxWidth: 992
	};

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				active: true
			});
		});
	}

	render() {
		const {maxWidth, content} = this.props;

		const sectionCss = [CSS.section];
		let wrapStyle = {};

		if (this.state.active) {
			sectionCss.push(CSS.sectionActive);
		}

		if (maxWidth) {
			wrapStyle = {
				...wrapStyle,
				maxWidth,
				margin: '0 auto'
			};
		}

		return (
			<div className={sectionCss.join(' ')}>
				<div className="container">
					<div className={CSS.wrap} style={wrapStyle}>
						<SectionContent classname="fullWidthContent" content={content} contentContainerWidth={maxWidth ? maxWidth : 992}/>
					</div>
				</div>
			</div>
		);
	}
}
