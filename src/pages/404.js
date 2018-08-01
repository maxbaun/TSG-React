import React from 'react';
import Page from '../components/page';

import SectionContent from '../components/sectionContent';
import CSS from '../css/modules/404.module.scss';

const NotFound = () => {
	return (
		<Page contain>
			<div className={CSS.wrap}>
				<div>
					<SectionContent
						classname="notFound"
						content={{
							header: '<h1>Not Found</h1>',
							content: '<p>It looks like nothing was found at this location.',
							buttons: [
								{
									button: [
										{
											url: '/',
											text: 'Go Home',
											classname: 'primary'
										}
									]
								}
							]
						}}
					/>
				</div>
			</div>
		</Page>
	);
};

export default NotFound;
