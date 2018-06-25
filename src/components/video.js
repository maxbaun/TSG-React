import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import {ref} from '../utils/componentHelpers';
import CSS from '../css/modules/video.module.scss';
import Image from './image';
import Modal from './modal';
import RenderInBody from './renderInBody';

export default class Video extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalOpen: false
		};

		this.playBtn = null;
		this.handlePlayClick = this.handlePlayClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
	}

	static propTypes = {
		thumbnail: PropTypes.object,
		url: PropTypes.string,
		showPreview: PropTypes.bool,
		modal: PropTypes.bool,
		previewWidth: PropTypes.number
	};

	static defaultProps = {
		thumbnail: {},
		url: null,
		showPreview: true,
		modal: true,
		previewWidth: 710
	};

	handlePlayClick() {
		this.playBtn.classList.add(CSS.playAnimated);
		setTimeout(() => {
			this.playBtn.classList.remove(CSS.playAnimated);
		}, 2000);

		this.setState({modalOpen: true});
	}

	handleModalClose() {
		this.setState({modalOpen: false});
	}

	render() {
		const {thumbnail, previewWidth, url} = this.props;
		const {modalOpen} = this.state;

		const previewStyle = {
			width: previewWidth,
			margin: '0 auto',
			maxWidth: '100%',
			height: 'auto'
		};

		return (
			<div>
				<div className={CSS.preview} style={previewStyle}>
					<div className={CSS.previewInner}>
						<div className={CSS.previewOverlay}>
							<div ref={ref.call(this, 'playBtn')} className={CSS.play} onClick={this.handlePlayClick}>
								<span className={CSS.icon}/>
							</div>
						</div>
						<Image image={thumbnail}/>
					</div>
				</div>
				<RenderInBody>
					<Modal showClose onClose={this.handleModalClose} active={modalOpen} backgroundColor="transparent" size="medium">
						<div className={CSS.playerWrap}>
							<ReactPlayer
								className={CSS.player}
								url={url}
								width="100%"
								height="100%"
								style={{
									margin: '0 auto'
								}}
							/>
						</div>
					</Modal>
				</RenderInBody>
			</div>
		);
	}
}
