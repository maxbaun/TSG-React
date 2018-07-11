export const replaceLinks = str => {
	return str
		.replace('http://tsg.info', '')
		.replace('https://tsg.info', '')
		.replace('http://tsgweddings.com', '')
		.replace('https://tsgweddings.com', '')
		.replace('http://tsg.d3applications.com', '')
		.replace('https://tsg.d3applications.com', '')
		.replace('http://admin.tsgweddings.com', '')
		.replace('https://admin.tsgweddings.com', '');
};

export const isExternalLink = str => {
	const replaced = replaceLinks(str);

	if (replaced.includes('https://') || replaced.includes('http://')) {
		return true;
	}

	return false;
};

export const replaceContent = content => {
	return replaceLinks(content);
};

export const innerHtml = content => {
	content = replaceContent(content);

	return {__html: content};
};

export const sortByMenuOrder = list => {
	if (!list) {
		return;
	}

	return list.sort((a, b) => {
		if (a.node) {
			return a.node.menuOrder - b.node.menuOrder;
		}

		return a.menuOrder - b.menuOrder;
	});
};

export const bioName = name => {
	return getBioPart(name, 0);
};

export const bioPosition = name => {
	return getBioPart(name, 1);
};

function getBioPart(name, part) {
	const parts = name.split(' - ');

	return parts[part];
}
