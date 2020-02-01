import React from 'react';
import PropTypes from 'prop-types';

import CSS from '../css/modules/page.module.scss';
import DefaultLayout from './layout';

const Page = ({children, contain, style, padding}) => {
	if (contain) {
		children = <div className="container">{children}</div>;
	}

	const pageCss = [CSS.page];

	if (!padding) {
		pageCss.push(CSS.noPadding);
	}

	return (
		<DefaultLayout>
			<div className={pageCss.join(' ')} style={style}>
				{children}
			</div>
		</DefaultLayout>
	);
};

Page.propTypes = {
	children: PropTypes.node.isRequired,
	contain: PropTypes.bool,
	style: PropTypes.object,
	padding: PropTypes.bool
};

Page.defaultProps = {
	contain: false,
	style: {},
	padding: true
};

export default Page;
