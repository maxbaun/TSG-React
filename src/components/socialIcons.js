import React from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/socialIcons.module.scss';

const SocialIcons = ({facebook, pinterest, instagram, vimeo, youtube}) => {
	return (
		<div className={CSS.socialIcons}>
			<ul>
				{renderIcon(facebook, 'facebook-f')}
				{renderIcon(pinterest, 'pinterest')}
				{renderIcon(instagram, 'instagram')}
				{renderIcon(vimeo, 'vimeo')}
				{renderIcon(youtube, 'youtube')}
			</ul>
		</div>
	);
};

function renderIcon(link, icon) {
	if (!link || link === '') {
		return null;
	}

	return (
		<li>
			<a className={CSS.icon} href={link} target="_blank" rel="noopener noreferrer">
				<span className={`fab fa-${icon}`}/>
			</a>
		</li>
	);
}

SocialIcons.propTypes = {
	facebook: PropTypes.string,
	pinterest: PropTypes.string,
	instagram: PropTypes.string,
	vimeo: PropTypes.string,
	youtube: PropTypes.string
};

SocialIcons.defaultProps = {
	facebook: null,
	pinterest: null,
	instagram: null,
	vimeo: null,
	youtube: null
};

export default SocialIcons;
