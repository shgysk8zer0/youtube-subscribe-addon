const storage = browser.storage.sync;

const defaultOpts = {
	service: 'rss',
};

const handlers = {
	feedly: function(url, opts) {
		const feedly = new URL('https://feedly.com/i/subscription/feed/');
		feedly.pathname += encodeURIComponent(url.toString());
		browser.tabs.create({
			url: feedly.toString(),
		});
	},
	rss: function(url, opts) {
		browser.tabs.create({
			url: url.toString(),
		});
	},
	inoreader: function(url, opts) {
		const inoreader = new URL('https://www.inoreader.com');
		inoreader.searchParams.set('add_feed', url);
		browser.tabs.create({
			url: inoreader.toString(),
		});
	},
	ttrss: function(url, opts) {
		const ttrss = new URL('public.php', opts.ttrssUrl);
		ttrss.searchParams.set('op', 'subscribe');
		ttrss.searchParams.set('feed_url', url);
		browser.tabs.create({
			url: ttrss.toString(),
		});
	}
};

const icons = {
	default: 'img/icon.svg',
	disabled: 'img/disabled.svg',
};

async function clickHandler(tab) {
	const opts = await storage.get(['service', 'ttrssUrl']);
	const handler = opts.service || defaultOpts.service;
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

		handlers[handler](feedUrl, opts);
	} catch(err) {
		/* eslint no-console: "off" */
		console.error(err);
	}
}

async function scanTab(tab) {
	const tabId = tab.id || tab.tabId;
	const url = new URL(tab.url);

	if (url.host === 'www.youtube.com' && (
		url.pathname.startsWith('/channel/')
		|| url.pathname.startsWith('/user/')
		|| url.searchParams.has('list')
	)) {
		browser.pageAction.onClicked.addListener(clickHandler);

		browser.pageAction.setIcon({
			tabId,
			path: icons.default,
		});
		browser.pageAction.show(tabId);
	} else {
		browser.pageAction.setIcon({
			tabId,
			path: icons.disabled,
		});
		browser.pageAction.hide(tabId);

	}
}

async function refreshAllTabsPageAction() {
	const tabs = await browser.tabs.query({
		active: true
	});
	tabs.forEach(scanTab);
}

async function updateHandler(update) {
	if (update.temporary) {
		const opts = await storage.get();
		console.log({
			update, opts
		});
	}

	if (update.reason === 'install') {
		storage.set(defaultOpts);
	} else if (update.reason === 'update') {
		/*eslint no-fallthrough: "off"*/
		/*eslint no-case-declarations: "off"*/
		// let opts = await storage.get();
	}

	switch (update.previousVersion) {
	case '0.1.0':
		storage.set(defaultOpts);
		break;
	}
}

browser.tabs.onUpdated.addListener(refreshAllTabsPageAction);
browser.runtime.onInstalled.addListener(updateHandler);
