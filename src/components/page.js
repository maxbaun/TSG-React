import React from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/page.module.scss';

const Page = ({children, contain, style}) => {
	if (contain) {
		children = <div className="container">{children}</div>;
	}

	return (
		<div className={CSS.page} style={style}>
			{children}
		</div>
	);
};

Page.propTypes = {
	children: PropTypes.node.isRequired,
	contain: PropTypes.bool,
	style: PropTypes.object
};

Page.defaultProps = {
	contain: false,
	style: {}
};

export default Page;
