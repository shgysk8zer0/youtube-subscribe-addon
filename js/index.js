async function scanTab(tab) {
	const url = new URL(tab.url);

	if (
		url.pathname.startsWith('/channel/')
		|| url.pathname.startsWith('/user/')
		|| url.searchParams.has('list')
	) {
		browser.pageAction.show(tab.id || tab.tabId);
		browser.pageAction.onClicked.addListener(clickHandler);
	}
}

async function clickHandler(tab) {
	const url = new URL(tab.url);
	const feedUrl = new URL('/feeds/videos.xml', url.origin);

	try {
		if (url.pathname.startsWith('/user/')) {
			const userId = url.pathname.split('/')[2];
			feedUrl.searchParams.set('user', userId);
		} else if (url.pathname.startsWith('/channel/')) {
			const channelId = url.pathname.split('/')[2];
			feedUrl.searchParams.set('channel_id', channelId);
		} else if (url.searchParams.has('list')) {
			feedUrl.searchParams.set('playlist_id', url.searchParams.get('list'));
		} else {
			throw new Error(`There is no feed for ${url.toString()}`);
		}

		browser.tabs.create({
			url: feedUrl.toString(),
		});
	} catch(err) {
		console.error(err);
	}
}

async function refreshAllTabsPageAction() {
	const tabs = await browser.tabs.query({});
	tabs.forEach(scanTab);
}

browser.tabs.onUpdated.addListener(refreshAllTabsPageAction);
browser.runtime.onInstalled.addListener(refreshAllTabsPageAction);
